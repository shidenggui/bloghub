import Layout from '../../components/layout';
import { withApollo } from '../../libs/with-apollo';
import { IArticleOfClient, IBlogOfClient, RETRIEVE_ARTICLE_BY_SLUG } from '../../graphql/queries';
import Head from 'next/head';
import ArticleTwitterCard from '../../components/article-twitter-card';
import { TimeUtils } from '../../domains/infrastructure/time-utils';
import { ArticleJsonLd } from 'next-seo';
import Link from 'next/link';
import { BASE_HOST, DEFAULT_TWITTER_CARD_IMAGE } from '../../settings';
import Error from 'next/error';

const Page = ({article}: { article: IArticleOfClient }) => {
  if (!article) return <Error statusCode={404}/>;

  return (
    <Layout>
      <Head>
        <title key="title">{article.polishedTitle} - {article.blog.author}</title>
        <meta key="description" name="description" content={article.polishedSummary}/>
        <link rel="canonical" href={`${BASE_HOST}/articles/${article.slug}`} key="canonical"/>
        <link rel="prerender" href={article.url}/>
        <ArticleTwitterCard article={article}/>
      </Head>
      <ArticleJsonLd
        url={`${BASE_HOST}/articles/${article.slug}`}
        title={article.polishedTitle}
        datePublished={article.date}
        authorName={article.blog.author}
        description={article.polishedSummary}
        images={[]}
        publisherLogo={DEFAULT_TWITTER_CARD_IMAGE}
        publisherName={'BlogHub'}
      />

      <section className="my-12">
        <div className="mb-4">
          <header className="mb-4">
            <h1
              className="mt-8 text-xl font-normal text-gray-800 text-justify"
            >{(article as IArticleOfClient).polishedTitle}</h1>
            <div className="flex">
              <div className="text-sm my-2 ml-auto text-gray-600">
              <span className="text-gray-700">
              <Link href={"/blogs/[stableSite]"} as={`/blogs/${article.blog.stableSite}`}>
                  <a>
                    {article.blog.author}
                  </a>
                </Link>
            </span>
                &nbsp;at&nbsp;
                <time dateTime={article.date}>
                  {TimeUtils.humanReadableTimeOf(article.date)}
                </time>
              </div>
            </div>
          </header>


          <article className="text-gray-700 leading-relaxed text-justify">
            {article.polishedSummary}……
          </article>
        </div>

        <footer>
          <a className="block my-6 cursor-pointer" href={article.url} rel="noopener nofollow" target="_blank" title={article.title}>
            <div className="text-2xl text-red-700 font-medium text-center">
              Read More
            </div>
            <div className="flex">
              <div className="m-auto text-xs text-gray-500">
                Jump to&nbsp;
                <span className="">
            {(article.blog as IBlogOfClient).siteDomain}
            </span>
              </div>
            </div>
          </a>
        </footer>
      </section>
    </Layout>
  );
};

Page.getInitialProps = async ({apolloClient, query, res, isServer}) => {
  const {data: {articleBySlug: article}} = await apolloClient.query({
      query: RETRIEVE_ARTICLE_BY_SLUG,
      variables: {
        slug: query.slug,
      },
    },
  );
  if (!article && isServer) {
    res.statusCode = 404;
  }
  return {
    article,
  };
};

export default withApollo({ssr: true})(Page);
