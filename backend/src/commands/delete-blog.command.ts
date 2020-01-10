import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../domains/hub/respositories/blog';

@Injectable()
export class DeleteBlogCommand {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) {
  }

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({command: 'delete-blog <site>', describe: 'Delete blog by site url', autoExit: true})
  async run(
    @Positional({
      name: 'site',
      describe: 'site of deleted blog',
      type: 'string',
    }) site
  ) {
    await this.blogRepository.deleteBySite(site)
    console.log(`Delete blog ${site} success`)
    return
  }
}
