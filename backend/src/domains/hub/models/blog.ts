export class Blog {
  constructor(
    public id: number,
    public author: string,
    public site: string,
    public stableSite: string,
    public siteName: string,
    public feed: string ,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
  }
}
