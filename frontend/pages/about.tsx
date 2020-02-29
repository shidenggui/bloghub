import Layout from '../components/layout';
import Head from 'next/head';
import Markdown from '../components/markdown';
import { ABOUT_PAGE } from '../settings';

export default function About() {
  return (
    <Layout>
      <Head>
        <title key="title">About</title>
        <link rel="canonical" href="/about" key="canonical"/>
      </Head>
      <div className="my-12">
        <Markdown source={ABOUT_PAGE}/>
      </div>
    </Layout>
  );
}
