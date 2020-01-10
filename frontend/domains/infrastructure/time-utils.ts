export class TimeUtils {
  static humanReadableTimeOf(isoTime: string) {
    const parsedMS = Date.now() - Date.parse(isoTime);
    let seconds = Math.trunc(parsedMS / 1000);
    const minutes = Math.trunc(seconds / 60);
    const hours = Math.trunc(minutes / 60);
    const days = Math.trunc(hours / 24);
    const years = Math.trunc(days / 365);

    if (years !== 0) return `${years} 年前`;
    if (days !== 0) return `${days} 天前`;
    if (hours !== 0) return `${hours} 小时前`;
    if (minutes !== 0) return `${minutes} 分钟前`;
    if (seconds === 0) seconds = 1;
    return `${seconds} 秒前`;
  }
}
