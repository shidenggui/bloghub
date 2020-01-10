import { Controller, Get, Header } from '@nestjs/common';
import { ArticleRepository } from '../../domains/hub/respositories/article';
import { RssGenerator } from '../../domains/infrastructure/rss-generator';

@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {
  }

  @Get()
  @Header('content-type', 'application/xml')
  async list(): Promise<string> {
    const rssGenerator = new RssGenerator();
    const articles = await this.articleRepository.list({page: 1, size: 50});
    articles.map(a => rssGenerator.addItem(a));
    return rssGenerator.render();
  }
}
