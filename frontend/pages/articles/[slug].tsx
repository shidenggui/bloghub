import Layout from '../../components/layout';
import { withApollo } from '../../libs/with-apollo';
import { IArticleOfClient, IBlogOfClient, RETRIEVE_ARTICLE_BY_SLUG } from '../../graphql/queries';
import Head from 'next/head';
import ArticleTwitterCard from '../../components/article-twitter-card';
import { TimeUtils } from '../../domains/infrastructure/time-utils';
import Link from 'next/link';

const Page = ({article}: { article: IArticleOfClient }) => {
  return (
    <Layout>
      <Head>
        <title key="title">{article.polishedTitle}</title>
        <link rel="canonical" href={`/articles/${article.slug}`} key="canonical"/>

        <ArticleTwitterCard article={article}/>
      </Head>

      <div className="my-12">
        <div className="mb-4">
          <header className="mb-4">
            <h1 className="mt-8 text-xl font-normal text-gray-800 text-justify">{(article as IArticleOfClient).polishedTitle}</h1>
            <div className="flex">
              <div className="text-sm my-2 ml-auto text-gray-600">
              <span className="text-gray-700">
              <Link href={"/blogs/[stableSite]"} as={`/blogs/${article.blog.stableSite}`}>
                  <a>
                    {article.blog.author}
                  </a>
                </Link>
            </span>
                &nbsp;at {TimeUtils.humanReadableTimeOf(article.date)}</div>
            </div>
          </header>


          <div className="text-gray-700 leading-relaxed text-justify">
            {article.polishedSummary}……
          </div>
        </div>
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
      </div>
    </Layout>
  );
};

Page.getInitialProps = async ({apolloClient, query}) => {
  const {data: {articleBySlug: article}} = await apolloClient.query({
      query: RETRIEVE_ARTICLE_BY_SLUG,
      variables: {
        slug: query.slug,
      },
    },
  );
  return {
    article,
  };
};

export default withApollo({ssr: true})(Page);
