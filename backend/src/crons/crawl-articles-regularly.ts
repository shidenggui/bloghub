import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RssCrawlService } from '../domains/hub/services/rss-crawl-service';

@Injectable()
export class CrawlArticlesRegularlyService {
  private readonly logger = new Logger(CrawlArticlesRegularlyService.name);

  constructor(
    private readonly rssCrawlService: RssCrawlService
  ) {
  }

  @Cron(CronExpression.EVERY_HOUR,
    {name: 'crawl-articles-regularly'})
  async handleCron() {
    this.logger.log('Start to crawl articles regularly');
    await this.rssCrawlService.run()
    this.logger.log('Crawl finish');
  }
}
