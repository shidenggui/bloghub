
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Response {
    code: string;
    message: string;
}

export interface Article {
    id: number;
    url: string;
    slug: string;
    blog: Blog;
    title: string;
    tags: string[];
    summary: string;
    content: string;
    imgUrl?: string;
    date: DateTime;
    views: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface ArticlesByBlogResponse {
    articles: Article[];
    blog: Blog;
}

export interface ArticlesResponse {
    articles: Article[];
    pageInfo: PageInfo;
}

export interface Blog {
    id: number;
    author: string;
    site: string;
    stableSite: string;
    siteName: string;
    feed: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface PageInfo {
    total: number;
    hasMore: boolean;
}

export interface IQuery {
    articles(page: number, size: number): ArticlesResponse | Promise<ArticlesResponse>;
    articleById(id: number): Article | Promise<Article>;
    articleBySlug(slug: string): Article | Promise<Article>;
    articlesByBlog(stableSite: string): ArticlesByBlogResponse | Promise<ArticlesByBlogResponse>;
}

export type DateTime = any;
