import { Injectable } from "@nestjs/common";
import { ArticleRepository } from '../respositories/article';
import { Article } from '../models/article';
import { FILTER_KEYWORDS } from '../../../../settings';

@Injectable()
export class ArticleService {
  private readonly MAX_ARTICLES_PER_DAY: number = 2

  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {
  }

  async list({page, size} = {page: 1, size: Number.MAX_SAFE_INTEGER}): Promise<Article[]> {
    return (await this.articleRepository.list({page, size}))
      .filter(this.limitArticlesByBlogPerDay())
      .filter(this.filterArticlesByKeywords())
  }


  async listAllByBlog(blogId: number): Promise<Article[]> {
    return (await this.articleRepository.listAllByBlog(blogId))
      .filter(this.filterArticlesByKeywords())
  }

  private limitArticlesByBlogPerDay(): (Article) => boolean {
    const articleDayCount = new Map<string, number>()
    return a => {
      const key = a.blog.stableSite + a.createdAt.toDateString();
      const cnt = articleDayCount.get(key) || 0;
      if (cnt >= this.MAX_ARTICLES_PER_DAY) return false;
      articleDayCount.set(key, cnt + 1)
      return true
    }
  }

  private filterArticlesByKeywords(): (Article) => boolean {
    return a => !Boolean(FILTER_KEYWORDS.filter(k => a.title.toLowerCase().includes(k)).length)
  }
}
