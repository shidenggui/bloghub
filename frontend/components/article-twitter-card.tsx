import { Article } from '../../graphql/graphql';
import TwitterCard, { TwitterCardType } from './twitter-card';
import { DEFAULT_TWITTER_CARD_IMAGE } from '../settings';

export default function ArticleTwitterCard({article}: { article: Article }) {
  let card = TwitterCardType.SUMMARY;
  let image = DEFAULT_TWITTER_CARD_IMAGE;

  if (article.imgUrl) {
    card = TwitterCardType.SUMMARY_LARGE_IMAGE;
    image = article.imgUrl;
  }
  return (
    <TwitterCard card={card} title={article.title} description={article.summary} image={image}/>
  );
}
