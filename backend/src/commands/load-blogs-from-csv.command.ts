import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../domains/hub/respositories/blog';

@Injectable()
export class LoadBlogsFromCsvCommand {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) {
  }

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({command: 'load-blogs-from-csv', describe: 'Load blogs from csv', autoExit: true})
  async run() {
    await this.blogRepository.loadBlogs()
    return
  }
}
