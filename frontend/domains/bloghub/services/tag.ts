import { TAG, TECH_KEYWORDS } from '../constants';

export class TagService {
  static filterByTag(tag: string): (Article) => boolean {
    if (tag == TAG.ALL) return () => true

    const techFilter = a => Boolean(TECH_KEYWORDS.filter(k => a.title.toLowerCase().includes(k)).length);
    if (tag == TAG.TECH) return techFilter

    return a => !techFilter(a)
  }
}
