import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../domains/hub/respositories/blog';

@Injectable()
export class ListBlogsCommand {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) {
  }

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({command: 'list-blogs', describe: 'Delete blog by site url', autoExit: true})
  async run() {
    console.dir(await this.blogRepository.list({}), {maxArrayLength: null})
  }
}
