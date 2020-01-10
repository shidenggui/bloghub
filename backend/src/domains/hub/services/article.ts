import { Injectable } from "@nestjs/common";
import { ArticleRepository } from '../respositories/article';
import { BlogRepository } from '../respositories/blog';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly blogRepository: BlogRepository
  ) {
  }


}
