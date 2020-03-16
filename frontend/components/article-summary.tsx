import Link from 'next/link';
import { TimeUtils } from '../domains/infrastructure/time-utils';
import { MiscUtils } from '../domains/infrastructure/misc-utils';
import { IArticleOfClient } from '../graphql/queries';

import { useDispatch } from 'react-redux'
import { setScrollPosition } from '../store/actions';

export default function ArticleSummary({article}: { article: IArticleOfClient }) {
  const dispatch = useDispatch()
  return (
    <Link href={"/articles/[slug]"} as={`/articles/${article.slug}`}>

      <section className="py-4 first:pt-0 border-t first:border-t-0 text-gray-700 cursor-pointer tracking-wide"
               onClick={() => dispatch(setScrollPosition(window.scrollY))}
      >
        <header className="flex my-2 items-center text-xs">
          <div className="p-1 bg-gray-200 leading-tight text-gray-600 rounded-sm">
            {article.tags[0] || '无题'}
          </div>
          <div className="p-1 px-2 text-gray-500">
            •
          </div>
          <Link href={"/blogs/[stableSite]"} as={`/blogs/${article.blog.stableSite}`}>
            <a className="block font-bold text-gray-600" onClick={() => dispatch(setScrollPosition(window.scrollY))}>
              {article.blog.authorName}
            </a>
          </Link>
        </header>

        <h2 className="my-2 text-gray-700 text-base text-justify active:text-red-700">
          <a>{MiscUtils.adjustSpace(article.polishedTitle)}</a>
        </h2>


        <footer className="flex">
          <time className="block ml-auto text-xs text-gray-600" dateTime={article.date} itemProp="datePublished">
            {TimeUtils.humanReadableTimeOf(article.date)}
          </time>
        </footer>
      </section>
    </Link>
  );
}
