import { Blog } from '../../../../graphql/graphql';

export const BlogResolver = {
  siteDomain(blog: Blog): string {
    return new URL(blog.site).hostname
      .replace(/^www./, '')
  }
}


