import Layout from '../components/layout';
import Head from 'next/head';
import Markdown from '../components/markdown';
import { ABOUT_PAGE, BASE_HOST } from '../settings';

export default function About() {
  return (
    <Layout>
      <Head>
        <title key="title">About</title>
        <link rel="canonical" href={`${BASE_HOST}/about`} key="canonical"/>
      </Head>
      <div className="my-12">
        <Markdown source={ABOUT_PAGE}/>
      </div>
    </Layout>
  );
}
