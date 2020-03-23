import { BlogCsvLoader } from '../../infrastructure/blog-csv-loader';
import { BLOG_CSV_PATH } from '../../../../settings';
import { CreateBlogDto } from '../dtos/create-blog-dto';
import { Blog } from '../models/blog';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogTable } from '../../../tables/blog';
import { Repository } from 'typeorm';
import { MiscUtils } from '../../infrastructure/misc-utils';
import { ArticleTable } from '../../../tables/article';

@Injectable()
export class BlogRepository {
  private readonly logger = new Logger('BlogRepository');

  constructor(
    @InjectRepository(BlogTable)
    private readonly tableRepository: Repository<BlogTable>,
    @InjectRepository(ArticleTable)
    private readonly articleTableRepository: Repository<ArticleTable>,
  ) {
  }

  async loadBlogs() {
    this.logger.log('Start to load blogs');
    // Load blogs from csv
    const createBlogDtos = (await new BlogCsvLoader(BLOG_CSV_PATH).parse())
    console.log(`Try to create or update ${createBlogDtos.length} blog`)
    await Promise.all(createBlogDtos.map(async o => await this.createOrUpdate(o)))
    console.log(`Create or update ${createBlogDtos.length} blog success`)
  }

  async list({page = 1, size = Number.MAX_SAFE_INTEGER}): Promise<Blog[]> {
    const blogRecords = await this.tableRepository
      .createQueryBuilder()
      .orderBy('createdAt', 'DESC')
      .offset((page - 1) * size)
      .limit(size)
      .getMany();
    return blogRecords.map(a => a.toModel());
  }

  async retrieveByStableSite(stableSite: string): Promise<Blog | null> {
    return (await this.tableRepository
      .findOne({stableSite}))
      ?.toModel()
  }


  async deleteBySite(site: string) {
    const blogRecord = await this.tableRepository.findOne({stableSite: MiscUtils.makeUrlStable(site)})
    if (!blogRecord) {
      return
    }
    await this.articleTableRepository.delete({blog: blogRecord})
    await this.tableRepository.delete({id: blogRecord.id})
  }

  async updateAuthor(feed: string, author: string) {
    await this.tableRepository.update({stableFeed: MiscUtils.makeUrlStable(feed)}, {author})
  }

  async createOrUpdate(dto: CreateBlogDto): Promise<Blog> {
    this.logger.log(`Create blog by ${dto}`)

    let blogRecord = await this.tableRepository.findOne({stableSite: dto.stableSite});
    if (!blogRecord) {
      blogRecord = new BlogTable()
      await this.tableRepository.save(Object.assign(blogRecord, dto));
    } else {
      await this.tableRepository.update({id: blogRecord.id}, dto);
    }

    blogRecord = await this.tableRepository.findOne({id: blogRecord.id});
    this.logger.log(`Finish creating blog by ${dto.repr()}`)
    return blogRecord.toModel();
  }
}
