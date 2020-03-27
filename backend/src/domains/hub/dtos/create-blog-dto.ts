import { BaseDto } from '../../infrastructure/base-dto';
import { MiscUtils } from '../../infrastructure/misc-utils';

export class CreateBlogDto extends BaseDto {
  public stableSite: string
  public stableFeed: string
  public author: string

  constructor(
    public site: string,
    public siteName: string,
    public feed: string,
    public ignore: boolean,
  ) {
    super()
    this.stableSite = MiscUtils.makeUrlStable(this.site)
    this.stableFeed = MiscUtils.makeUrlStable(this.feed)
    this.author = this.siteName
  }
}
