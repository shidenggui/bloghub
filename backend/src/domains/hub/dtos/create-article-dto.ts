import { BaseDto } from '../../infrastructure/base-dto';
import { MiscUtils } from '../../infrastructure/misc-utils';

export class CreateArticleDto extends BaseDto {
  public stableUrl: string
  public stableFeed: string
  public slug: string

  constructor(
    public feed: string,
    public url: string,
    public title: string,
    public tags: string[],
    public summary: string,
    public content: string,
    public date: Date,
  ) {
    super()
    this.stableUrl = MiscUtils.makeUrlStable(this.url)
    this.stableFeed = MiscUtils.makeUrlStable(this.feed)
    this.slug = MiscUtils.makeSlug(this.stableUrl)
  }


  repr() {
    return JSON.stringify({
      ...this,
      summary: this.summary.slice(0, 25),
      content: this.content.slice(0, 25)
    });
  }

}
