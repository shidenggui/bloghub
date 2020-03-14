import Layout from '../../components/layout';
import { IArticleOfClient, IBlogOfClient, LiST_ARTICLES_BY_BLOG } from '../../graphql/queries';
import { Blog } from '../../../graphql/graphql';
import { withApollo } from '../../libs/with-apollo';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import { BASE_HOST } from '../../settings';

const Page = ({articles, blog}: { articles: IArticleOfClient[], blog: Blog | null }) => {
  if (!blog) return <Error statusCode={404}/>;

  const yearArticlesMap = articles.reduce((map, cur) => {
    const key = cur.date.slice(0, 4);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(cur);
    return map;
  }, new Map<string, IArticleOfClient[]>());

  return (
    <Layout>
      <Head>
        <title key="title">{blog.author} - 博客文章</title>
        <meta key="description" name="description" content={articles.map(a => a.polishedTitle).join(',').slice(0, 200)}/>
        <link rel="canonical" href={`${BASE_HOST}/blogs/${blog.stableSite}`} key="canonical"/>
      </Head>

      <div className="my-12">
        <header className="text-2xl">
          <a href={blog.site} target="_blank" rel="nofollow noopener" className="block">
            <h1>
              {blog.author}
            </h1>
            <div className="text-xs text-gray-500">
              {(blog as IBlogOfClient).siteDomain}
            </div>
          </a>

        </header>
        {Array.from(yearArticlesMap.keys()).map(y => (
          <div key={y}>
            <div className="mt-12 mb-6 text-xl text-gray-500 font-medium">{y}</div>
            {yearArticlesMap.get(y).map(a => (
              <Link href={"/articles/[slug]"} as={`/articles/${a.slug}`} key={a.slug}>
                <a className="block my-6 text-gray-800 active:text-red-700 cursor-pointer">
                  {a.polishedTitle}
                </a>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

Page.getInitialProps = async ({apolloClient, query, res, isServer}) => {
  const {data: {articlesByBlog}} = await apolloClient.query({
    query: LiST_ARTICLES_BY_BLOG,
    variables: {
      stableSite: query.stableSite,
    },
  });
  if (!articlesByBlog) {
    if (isServer) {
      res.statusCode = 404;
    }

    return {
      blog: null,
      articles: []
    }
  }
  return {
    articles: articlesByBlog.articles,
    blog: articlesByBlog.blog
  };
};

export default withApollo({ssr: true})(Page);
