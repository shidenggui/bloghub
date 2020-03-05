import Layout from '../components/layout';
import { withApollo } from '../libs/with-apollo';
import ArticleSummary from '../components/article-summary';
import { LIST_ARTICLES } from '../graphql/queries';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { useRef, useState } from 'react';
import { Article, ArticlesResponse } from '../../graphql/graphql';
import TwitterCard from '../components/twitter-card';
import { HOME_PAGE_SIZE } from '../settings';

const Page = ({initArticles}) => {
  const articlesRef = useRef<Article[]>(initArticles);

  const [page, setPage] = useState(1);
  const {data, loading} = useQuery<{ articles: ArticlesResponse }>(LIST_ARTICLES, {
    variables: {
      page: page,
      size: HOME_PAGE_SIZE,
    },
    skip: page === 1,
    // Apollo bug, see https://github.com/apollographql/apollo-client/issues/5659
    fetchPolicy: "network-only"
  });

  let hasMore = true;
  if (!loading && data) {
    articlesRef.current.push(...data.articles.articles);
    hasMore = page === 1 || data?.articles?.pageInfo?.hasMore;
  }

  return (
    <Layout>
      <Head>
        <title key="title">BlogHub</title>
        <link rel="canonical" href="/" key="canonical"/>

        <TwitterCard title={'BlogHub'}
                     description={'Home For Independent Bloggers'}
        />
      </Head>

      <div className="my-12">
        {articlesRef.current.map(a => (
          <ArticleSummary article={a as any} key={a.id}/>
        ))}
        {hasMore &&
        <div className="my-8 text-2xl text-red-700 font-medium text-center cursor-pointer" onClick={() => setPage(page + 1)}>
          {loading ? 'Loading...' : 'Read More'}
        </div>
        }

      </div>

      <div className="my-2">
        <a href="http://www.beian.miit.gov.cn" target="_blank" rel="nofollow noopener" className="hidden lg:block text-center text-gray-300 text-xs">
          浙ICP备17008156号
        </a>
      </div>

    </Layout>
  );
};

Page.getInitialProps = async ({apolloClient}) => {
  const {data: {articles: {articles}}} = await apolloClient.query({
      query: LIST_ARTICLES,
      variables: {
        page: 1,
        size: HOME_PAGE_SIZE,
      },
    },
  );
  return {
    initArticles: articles,
  };
};

export default withApollo({ssr: true})(Page);
