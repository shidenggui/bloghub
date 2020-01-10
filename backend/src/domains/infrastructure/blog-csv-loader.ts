// Import blog information from https://github.com/timqian/chinese-independent-blogs/blob/master/blogs-original.csv
import { readFileSync } from 'fs'
import neatCsv from 'neat-csv'
import { CreateBlogDto } from '../hub/dtos/create-blog-dto'

interface BlogRow {
  Introduction: string,
  Address: string,
  ['RSS feed']: string,
  tags: string
}

export class BlogCsvLoader {
  constructor(public readonly path: string) {
  }

  async parse(): Promise<CreateBlogDto[]> {
    const blogRows = await neatCsv<BlogRow>(
      readFileSync(this.path),
      {
        mapHeaders: ({header}) => header.trim()
      })
    console.log(`Load ${blogRows.length} blog rows from file ${this.path}`)
    if (blogRows.length) {
      console.log(`Example: ${JSON.stringify(blogRows[0])}`)
    }
    return blogRows
      .filter(r => r['RSS feed'].trim() !== "")
      .map(r => {
        return new CreateBlogDto(
          r.Address.trim(),
          r.Introduction.trim(),
          r['RSS feed'].trim()
        )
      })
  }
}
