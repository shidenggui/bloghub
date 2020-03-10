import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RssParser } from '../domains/infrastructure/rss-parser';

@Injectable()
export class TestRssCommand {

  @Command({command: 'test-rss <rss>'})
  async run(
    @Positional({
      name: 'rss',
      describe: 'rss address of blog',
      type: 'string',
    }) rss
  ) {
    console.log(JSON.stringify(await new RssParser().fetch(rss), null, 2))
    return
  }
}
