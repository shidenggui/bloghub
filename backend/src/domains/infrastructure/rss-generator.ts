import Rss from 'rss';
import { Article } from '../hub/models/article';

interface RSS {
  item(itemOptions: ItemOptions): RSS;

  xml(): string;
}

interface ItemOptions {
  title: string;
  description: string;
  author: string,
  url: string;
  date: Date | string;
}

export class RssGenerator {
  feed: RSS;

  constructor() {
    this.feed = new Rss({
      title: 'BlogHub',
      // eslint-disable-next-line @typescript-eslint/camelcase
      feed_url: 'https://bloghub.com/feeds',
      // eslint-disable-next-line @typescript-eslint/camelcase
      site_url: 'https://bloghub.com',
    });
  }

  addItem(article: Article) {
    this.feed.item({
      title: article.title,
      url: `https://bloghub.com/articles/${article.slug}`,
      date: article.date,
      author: article.blog.siteName,
      description: article.summary.slice(0, 200),
    });
  }

  render(): string {
    return this.feed.xml();
  }
}
