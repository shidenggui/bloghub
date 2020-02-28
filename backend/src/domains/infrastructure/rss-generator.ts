import Rss from 'rss';
import { Article } from '../hub/models/article';
import { BASE_HOST } from '../../../settings';

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
      feed_url: `${BASE_HOST}/feeds`,
      // eslint-disable-next-line @typescript-eslint/camelcase
      site_url: BASE_HOST,
    });
  }

  addItem(article: Article) {
    this.feed.item({
      title: article.title,
      url: `${BASE_HOST}/articles/${article.slug}`,
      date: article.date,
      author: article.blog.siteName,
      description: article.summary.slice(0, 200),
    });
  }

  render(): string {
    return this.feed.xml();
  }
}
