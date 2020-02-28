import { Injectable, Logger } from "@nestjs/common";
import { ArticleRepository } from '../respositories/article';
import { BlogRepository } from '../respositories/blog';
import { RssParser } from '../../infrastructure/rss-parser';
import PQueue from 'p-queue'
import { FETCH_FEED_CONCURRENCY } from '../../../../settings';

@Injectable()
export class RssCrawlService {
  private readonly logger = new Logger('RssCrawlService');
  private readonly rssParser: RssParser

  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly articleRepository: ArticleRepository) {
    this.rssParser = new RssParser()
  }

  // Crawl all blog articles by rss
  async run() {
    const feeds = (await this.blogRepository.list({}))
      .map(o => o.feed)
    this.logger.log(`Start to crawl ${feeds.length} feeds`)

    const pQueue = new PQueue({concurrency: FETCH_FEED_CONCURRENCY})
    await pQueue.addAll(
      feeds.map(
        f => async () => await this.crawl(f)
      )
    )
    this.logger.log(`Crawl success`)
  }

  async crawl(feed: string) {
    this.logger.log(`Start to crawl ${feed}`)

    let rssParseOutput = null;
    try {
      rssParseOutput = await this.rssParser.fetch(feed);
    } catch (e) {
      console.log(`Fetch rss ${feed} error`, e)
      return
    }

    // Rename author by rss parse output
    if (rssParseOutput.author) {
      await this.blogRepository.updateAuthor(feed, rssParseOutput.author)
    }

    await Promise.all(
      rssParseOutput.articles
        .map(async o => {
            // try {
              await this.articleRepository.createOrUpdate(o)
            // } catch (e) {
            //   console.log(`Try to create or update ${o.repr()} failed`, e)
            // }
          }
        )
    )
    this.logger.log(`Crawl ${feed} success`)
  }

}
