import { DEFAULT_TWITTER_CARD_IMAGE } from '../settings';

export enum TwitterCardType {
  SUMMARY = 'summary',
  SUMMARY_LARGE_IMAGE = 'summary_large_image',
}

interface TwitterCardOption {
  card?: TwitterCardType
  title: string;
  description: string;
  image?: string;
}

export default function TwitterCard({
                                      card = TwitterCardType.SUMMARY,
                                      title,
                                      description,
                                      image = DEFAULT_TWITTER_CARD_IMAGE
                                    }: TwitterCardOption) {
  return (
    <>
      <meta key="twitter:card" name="twitter:card" content={card}/>
      <meta key="twitter:site" name="twitter:site" content="@shidenggui"/>
      <meta key="og:title" property="og:title" content={title}/>
      <meta key="og:description" property="og:description"
            content={description}/>
      {image && (<meta key="og:image" property="og:image" content={image}/>)}
    </>
  );
}
