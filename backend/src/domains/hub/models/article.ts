import { Blog } from './blog';

export class Article {
  constructor(
    public id: number,
    public url: string,
    public slug: string,
    public blog: Blog,
    public title: string,
    public tags: string[],
    public summary: string,
    public content: string,
    public imgUrl: string | null,
    public date: Date,
    public views: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
  }

}
