import Parser from 'rss-parser'
import { CreateArticleDto } from '../hub/dtos/create-article-dto';
import { FETCH_FEED_TIMEOUT } from '../../../settings';

export interface RssParseOutput {
  author?: string,
  articles: CreateArticleDto[],
}

export class RssParser {
  constructor(private readonly parser = new Parser({
    timeout: FETCH_FEED_TIMEOUT
  })) {
  }

  private fixDate(date: Date): Date {
    const now = new Date();
    if (date <= now) {
      return date
    }

    // If date happens in future, subtract one day
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    return date
  }

  async fetch(feed: string): Promise<RssParseOutput> {
    console.log(`Start to fetch ${feed}`)
    const result = await this.parser.parseURL(feed)
    console.log(`Fetch ${feed} finish`)

    const articles = result.items
      // Filter too long url
      .filter(o => o.link.trim().length <= 255)
      .map(o => new CreateArticleDto(
        feed,
        o.link.trim(),
        o.title.trim(),
        o.categories?.filter(t => typeof t === 'string') || [],
        o.contentSnippet?.trim() || '',
        o.content?.trim() || '',
        this.fixDate(new Date(o.pubDate))
      ))
      .filter(o => !isNaN(o.date.getTime()))
    let author = null;
    if (result.items?.length) {
      author = result.items.map(o => o.creator).filter(o => o)[0] || null;
    }

    return {
      author,
      articles
    }
  }
}
