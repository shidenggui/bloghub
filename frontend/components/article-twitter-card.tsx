import { Article } from '../../graphql/graphql';
import TwitterCard, { TwitterCardType } from './twitter-card';
import { DEFAULT_TWITTER_CARD_IMAGE } from '../settings';

export default function ArticleTwitterCard({article}: { article: Article }) {
  let card = TwitterCardType.SUMMARY;
  let image = DEFAULT_TWITTER_CARD_IMAGE;

  // Find md image urls
  const imageRegex: string[] | null = article.content.match(/!\[.*?]\((.*?)\)/);
  if (imageRegex) {
    card = TwitterCardType.SUMMARY_LARGE_IMAGE;
    image = imageRegex[1];
  }
  return (
    <TwitterCard card={card} title={article.title} description={article.summary} image={image}/>
  );
}
