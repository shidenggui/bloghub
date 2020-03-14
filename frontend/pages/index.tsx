import Layout from '../components/layout';
import { withApollo } from '../libs/with-apollo';
import ArticleSummary from '../components/article-summary';
import { IArticleOfClient, LIST_ARTICLES } from '../graphql/queries';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { ArticlesResponse } from '../../graphql/graphql';
import TwitterCard from '../components/twitter-card';
import { BASE_HOST, HOME_PAGE_SIZE } from '../settings';
import { useDispatch, useSelector } from 'react-redux'
import { addArticles, nextPage, setScrollPosition } from '../store/actions';
import { useState } from 'react';

const Page = () => {
  const storeArticles: IArticleOfClient[] = useSelector(state => state.articles.articles)
  const storeTargetPage: number = useSelector(state => state.articles.targetPage)
  const storePage: number = useSelector(state => state.articles.page)
  const storeScrollToPosition: number = useSelector(state => state.articles.scrollPosition)
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()
  const shouldRefresh = storePage !== storeTargetPage;

  const {data, loading} = useQuery<{ articles: ArticlesResponse }>(LIST_ARTICLES, {
    variables: {
      page: storeTargetPage,
      size: HOME_PAGE_SIZE,
    },
    skip: !shouldRefresh,
    // Apollo bug, see https://github.com/apollographql/apollo-client/issues/5659
    fetchPolicy: "no-cache"
  });

  if (!loading && data) {
    if (shouldRefresh) {
      dispatch(addArticles((data.articles.articles as IArticleOfClient[]), storeTargetPage))
      setHasMore(data?.articles?.pageInfo?.hasMore)
    } else if (typeof window !== 'undefined' && storeScrollToPosition) {
      window.scrollTo(0, storeScrollToPosition)
      dispatch(setScrollPosition(0))
    }
  }

  return (
    <Layout>
      <Head>
        <title key="title">独立个人博客推荐 - BlogHub</title>
        <link rel="canonical" href={BASE_HOST} key="canonical"/>

        <TwitterCard title={'BlogHub'}
                     description={'一群自由而有趣的灵魂，终将在此相遇'}
        />
      </Head>

      <div className="my-12">
        {storeArticles.map(a => (
          <ArticleSummary article={a as any} key={a.id}/>
        ))}
        {hasMore &&
        <div className="my-8 text-2xl text-red-700 font-medium text-center cursor-pointer" onClick={() => dispatch(nextPage())}>
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

Page.getInitialProps = async ({store, apolloClient}) => {
  if (store.getState().articles.page >= 1) {
    return {}
  }

  const {data: {articles: {articles}}} = await apolloClient.query({
      query: LIST_ARTICLES,
      variables: {
        page: 1,
        size: HOME_PAGE_SIZE,
      },
      fetchPolicy: "no-cache"
    },
  );
  store.dispatch(nextPage())
  store.dispatch(addArticles(articles, 1))
  return {};
};

export default withApollo({ssr: true})(Page);
