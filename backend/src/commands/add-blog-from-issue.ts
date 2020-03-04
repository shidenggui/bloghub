import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../domains/hub/respositories/blog';
// import { CreateBlogDto } from '../domains/hub/dtos/create-blog-dto';
import axios from 'axios'
import { safeLoadAll } from 'js-yaml'
import { readFileSync, writeFileSync } from 'fs'
import { BLOG_CSV_PATH } from '../../settings';

const GITHUB_ISSUE_API = 'https://api.github.com/repos/shidenggui/bloghub/issues/'

@Injectable()
export class AddBlogFromIssueCommand {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) {
  }

  @Command({command: 'add-blog-from-issue <issue>', describe: 'add blog from github issue', autoExit: true})
  async run(
    @Positional({
      name: 'issue',
      describe: 'github issue number',
      type: 'number',
    }) issue: number
  ) {
    const issueUrl = `${GITHUB_ISSUE_API}${issue}`
    console.log(`Fetch issue date from ${issueUrl}`)
    const {data: {body}} = await axios.get(issueUrl)
    const [blogInfo] = safeLoadAll(body)
    console.log(`Added blog ${JSON.stringify(blogInfo)}`)
    let csv = readFileSync(BLOG_CSV_PATH, 'utf8')
    csv = csv.trim() + `\n${blogInfo['Introduction'].trim()}, ${blogInfo['Address'].trim()}, ${blogInfo['RSS feed'].trim()}, ${blogInfo['tags'].trim()}`
    writeFileSync(BLOG_CSV_PATH, csv)

    return
  }
}
