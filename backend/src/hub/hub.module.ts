import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTable } from '../tables/blog';
import { BlogRepository } from '../domains/hub/respositories/blog';
import { RssCrawlService } from '../domains/hub/services/rss-crawl-service';
import { ArticleRepository } from '../domains/hub/respositories/article';
import { ArticleTable } from '../tables/article';
import { ArticleResolver } from './graphql/article-resolver';
import { FeedsController } from './feeds/feeds.controller';
import { LoadBlogsFromCsvCommand } from '../commands/load-blogs-from-csv.command';
import { CrawlArticlesByRssCommand } from '../commands/crawl-articles-by-rss.command';
import { DeleteBlogCommand } from '../commands/delete-blog.command';
import { GenerateTypingsByGraphqlCommand } from '../commands/generate-typings-by-graphql.command';
import { CrawlArticlesRegularlyService } from '../crons/crawl-articles-regularly';
import { AddBlogFromIssueCommand } from '../commands/add-blog-from-issue';
import { TestRssCommand } from '../commands/test-rss.command';
import { TestRssWithSaveCommand } from '../commands/test-rss-with-save.command';
import { ArticleService } from '../domains/hub/services/article';
import { ListBlogsCommand } from '../commands/list-blogs.command';

const HubTypeOrmModule = TypeOrmModule.forFeature([BlogTable, ArticleTable]);

@Module({
  imports: [HubTypeOrmModule],
  controllers: [FeedsController],
  providers: [
    BlogRepository,
    RssCrawlService,
    ArticleRepository,
    ArticleResolver,
    ArticleService,
    LoadBlogsFromCsvCommand,
    CrawlArticlesByRssCommand,
    DeleteBlogCommand,
    GenerateTypingsByGraphqlCommand,
    CrawlArticlesRegularlyService,
    AddBlogFromIssueCommand,
    TestRssCommand,
    TestRssWithSaveCommand,
    ListBlogsCommand,
  ],
  exports: [
    HubTypeOrmModule,
  ],
})
export class HubModule {
}
