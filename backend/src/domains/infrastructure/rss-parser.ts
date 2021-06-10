import Parser from 'rss-parser'
import { CreateArticleDto } from '../hub/dtos/create-article-dto';
import { FETCH_FEED_TIMEOUT } from '../../../settings';

export interface RssParseOutput {
  author?: string,
  articles: CreateArticleDto[],
}

export class RssParser {
  constructor(private readonly parser = new Parser({
    timeout: FETCH_FEED_TIMEOUT,
    customFields: {
      item: [
        'summary',
        'category',
        // Example: https://pkq.xyz/rss
        'content:encoded',
      ]
    },
    headers: {
      Accept: 'application/rss+xml, application/xml',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    },
  })) {
  }

  async fetch(feed: string): Promise<RssParseOutput> {
    console.log(`Start to fetch ${feed}`)
    const result = await this.parser.parseURL(feed)
    console.log(`Fetch ${feed} finish`)

    const articles = result.items
      // Filter too long url
      .filter(o => o.link.trim().length <= 255)
      .filter(o => o.title.trim().length <= 255)
      .map(o => new CreateArticleDto(
        feed,
        this.parseLink(feed, o.link),
        o.title.trim(),
        this.parseCategory(o),
        this.parseSummary(o),
        o.content?.trim() || o['content:encoded']?.trim() || '',
        this.parseImgUrl(o),
        this.fixDate(new Date(o.pubDate))
        )
      )
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

  private parseImgUrl(article: Parser.Item): string | null {
    const imgUrlRegex = /<img[^>]*? src="(.*?)" [^>]*?>/
    let imgUrl = article.content?.match(imgUrlRegex)?.[1]
    if (!imgUrl) imgUrl = article['content:encoded']?.match(imgUrlRegex)?.[1]
    return imgUrl || null
  }

  private parseCategory(article: Parser.Item): string[] {
    let categories = article.categories?.filter(t => typeof t === 'string') || []
    if (!categories.length) {
      // for <category>tag</category>, example: https://beyondstars.xyz/posts/index.xml
      if (typeof (article as any).category === 'string') categories = [(article as any).category]
      // for <category term='tag'/>
      if ((article as any).category?.$?.term) categories = [(article as any).category.$.term]
    }

    return categories
  }

  private parseLink(feed: string, link: string): string {
    link = link.trim()
    if (!link.startsWith('/')) return link

    return `${new URL(feed).origin}${link}`
  }

  private parseSummary(article: Parser.Item): string {
    return this.stripHtml(
      article.contentSnippet?.trim()
      || (typeof article.summary == 'string' ? article.summary.trim() : '')
      || article['content:encoded']?.trim()
      || ''
    );
  }

  // Copy from https://github.com/rbren/rss-parser/blob/73dc39b9febcc51c0915d2c9851d390863a4a8e4/lib/utils.js#L5
  private stripHtml(str: string): string {
    return str
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/\n/g, '');
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
}
