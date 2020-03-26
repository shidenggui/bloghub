import { Controller, Get, Header } from '@nestjs/common';
import { ArticleRepository } from '../../domains/hub/respositories/article';
import { RssGenerator } from '../../domains/infrastructure/rss-generator';
import { ArticleService } from '../../domains/hub/services/article';

@Controller('feeds')
export class FeedsController {
  constructor(
    private readonly articleService: ArticleService,
  ) {
  }

  @Get()
  @Header('content-type', 'application/xml')
  async list(): Promise<string> {
    const rssGenerator = new RssGenerator();
    const articles = await this.articleService.list({page: 1, size: 50});
    articles.map(a => rssGenerator.addItem(a));
    return rssGenerator.render();
  }
}
