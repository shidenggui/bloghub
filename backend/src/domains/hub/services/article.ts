import { Injectable } from "@nestjs/common";
import { ArticleRepository } from '../respositories/article';
import { BlogRepository } from '../respositories/blog';
import { Article } from '../models/article';

@Injectable()
export class ArticleService {

  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly blogRepository: BlogRepository,
    private readonly MAX_ARTICLES_PER_DAY: number = 2
  ) {
  }

  async list({page, size} = {page: 1, size: Number.MAX_SAFE_INTEGER}): Promise<Article[]> {
    const articles = await this.articleRepository.list({page, size})

    // Limit articles for blog author per day
    const articleDayCount = new Map<string, number>()
    return articles.filter(a => {
      const key = a.blog.stableSite + a.createdAt.toDateString();
      const cnt = articleDayCount.get(key) || 0;
      if (cnt >= this.MAX_ARTICLES_PER_DAY) return false;
      articleDayCount.set(key, cnt + 1)
      return true
    })
  }
}
