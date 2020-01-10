import { ArticleRepository } from '../../domains/hub/respositories/article';
import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Article } from '../../domains/hub/models/article';
import { BlogRepository } from '../../domains/hub/respositories/blog';

@Resolver('Article')
export class ArticleResolver {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly blogRepository: BlogRepository,
  ) {
  }

  @ResolveProperty()
  async summary(@Parent() article: Article, @Args('length') length: number) {
    // Remove clumsy tags
    return article.summary.slice(0, length);
  }

  @Query()
  async articles(@Args('page') page, @Args('size') size) {
    const articles = await this.articleRepository.list({page, size});

    const total = await this.articleRepository.count();
    const hasMore = total > (page * size);
    return {articles, pageInfo: {hasMore, total}};
  }

  @Query()
  async articleById(@Args('id') id: number) {
    return this.articleRepository.retrieveById(id);
  }

  @Query()
  async articleBySlug(@Args('slug') slug: string) {
    return this.articleRepository.retrieveBySlug(slug)
  }

  @Query()
  async articlesByBlog(@Args('stableSite') stableSite: string) {
    const blog = await this.blogRepository.retrieveByStableSite(stableSite)
    if (!blog) {
      return null
    }
    const articles = await this.articleRepository.listAllByBlog(blog.id)
    return {
      blog,
      articles
    }
  }
}
