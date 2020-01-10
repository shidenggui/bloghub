import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RssCrawlService } from '../domains/hub/services/rss-crawl-service';

@Injectable()
export class CrawlArticlesByRssCommand {
  constructor(
    private readonly rssCrawlService: RssCrawlService
  ) {
  }

  @Command({command: 'crawl-articles-by-rss'})
  async run() {
    await this.rssCrawlService.run()
    return
  }
}
