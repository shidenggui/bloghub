import { MiscUtils } from '../misc-utils';
import { Article } from '../../../../graphql/graphql';

export const ArticleResolver = {
  polishedTitle(article: Article): string {
    return MiscUtils.adjustSpace(article.title)
  },
  polishedSummary(article: Article): string {
    return MiscUtils.adjustSpace(article.summary).slice(0, 300)
  }
}

