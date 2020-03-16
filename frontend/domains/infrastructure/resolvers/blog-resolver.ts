import { Blog } from '../../../../graphql/graphql';

export const BlogResolver = {
  siteDomain(blog: Blog): string {
    return new URL(blog.site).hostname
      .replace(/^www./, '')
  },
  authorName(blog: Blog): string {
    return blog.author
      .replace('的网志', '')
      .replace('的博客站', '')
      .replace('的博客', '')
      .replace('的网络博客', '')
      .replace('的技术博客', '')
      .replace('的独立博客', '')
      .replace('博客', '')
      .replace("'s Blog", '')
      .replace("'s BlOG", '')
      .replace("'s blog", '')
      .trim()
  }
}


