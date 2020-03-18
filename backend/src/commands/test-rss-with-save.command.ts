import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RssParser } from '../domains/infrastructure/rss-parser';
import { ArticleRepository } from '../domains/hub/respositories/article';

@Injectable()
export class TestRssWithSaveCommand {
  constructor(
    private readonly articleRepository: ArticleRepository,
  ) {
  }

  @Command({command: 'test-rss-with-save <rss>'})
  async run(
    @Positional({
      name: 'rss',
      describe: 'rss address of blog',
      type: 'string',
    }) rss
  ) {
    const output = await new RssParser().fetch(rss);
    console.log(JSON.stringify(output, null, 2))
    await Promise.all(
      output.articles.map(async o => await this.articleRepository.createOrUpdate(o))
    )
    return
  }
}
