export class MiscUtils {
  static CN_EN_REGEX = /(\p{Unified_Ideograph})([A-Za-z0-9])/gu
  static EN_CN_REGEX = /([A-Za-z0-9])(\p{Unified_Ideograph})/gu

  // Copy from https://blog.csdn.net/QQ635785620/article/details/11201503
  static adjustSpace(s: string): string {
    return s
      .replace(this.CN_EN_REGEX, '$1 $2')
      .replace(this.EN_CN_REGEX, '$1 $2')
  }
}
