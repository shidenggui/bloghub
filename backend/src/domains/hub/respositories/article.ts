import { Article } from '../models/article';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dtos/create-article-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTable } from '../../../tables/article';
import { BlogTable } from '../../../tables/blog';

@Injectable()
export class ArticleRepository {
  private readonly logger = new Logger('ArticleRepository');

  constructor(
    private readonly configServer: ConfigService,
    @InjectRepository(ArticleTable)
    private readonly tableRepository: Repository<ArticleTable>,
    @InjectRepository(BlogTable)
    private readonly blogTableRepository: Repository<BlogTable>,
  ) {
  }

  async list({page, size} = {page: 1, size: Number.MAX_SAFE_INTEGER}): Promise<Article[]> {
    const records = await this.tableRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.blog', 'blog')
      .orderBy('date', 'DESC')
      .offset((page - 1) * size)
      .limit(size)
      .getMany();
    return records.map(a => a.toModel());
  }

  async listAllByBlog(blogId: number): Promise<Article[]> {
    const records = await this.tableRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.blog', 'blog')
      .where("article.blogId = :blogId", {blogId})
      .orderBy('date', 'DESC')
      .getMany();
    return records.map(a => a.toModel());
  }


  async retrieveById(id: number): Promise<Article | null> {
    return (await this.tableRepository
      .findOne({id}, {relations: ['blog']}))
      ?.toModel()
  }

  async retrieveBySlug(slug: string): Promise<Article | null> {
    return (await this.tableRepository
      .findOne({slug}, {relations: ['blog']}))
      ?.toModel()
  }


  async count(): Promise<number> {
    return await this.tableRepository.count();
  }

  async createOrUpdate(dto: CreateArticleDto): Promise<Article> {
    this.logger.log(`Create or update ${dto.repr()}`);
    const createArticle = {
      ...dto,
      blog: await this.blogTableRepository.findOne({stableFeed: dto.stableFeed}),
      tags: dto.tags.join(','),
    };
    delete createArticle.feed

    let articleTable = await this.tableRepository.findOne({stableUrl: dto.stableUrl});
    if (!articleTable) {
      // This instance is a plain object. So we must use findOne to get class instance latterly
      articleTable = await this.tableRepository.save(createArticle);
      // update
    } else {
      await this.tableRepository.update({id: articleTable.id}, createArticle);
    }
    articleTable = await this.tableRepository.findOne({id: articleTable.id}, {relations: ['blog']});
    return articleTable.toModel();
  }
}
