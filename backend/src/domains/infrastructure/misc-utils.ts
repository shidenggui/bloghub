import { crc32 } from 'js-crc'

export class MiscUtils {
  static makeUrlStable(url: string) {
    return url.replace(
      /^https?:\/\//, ''
    ).replace(
      /\/$/, ''
    )
  }

  static makeSlug(stableUrl: string): string {
    const hostname = new URL(`http://${stableUrl}`).hostname
    const digest = parseInt(crc32(stableUrl), 16).toString(36)
    return `${hostname}-${digest}`
  }
}
