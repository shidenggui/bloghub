import Header from './header';
import Head from 'next/head';
import { BAIDU_ANALYTIC, CDN_HOST, FAVICON, WWADS } from '../settings';

export default function Layout(props) {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta key="char-set" charSet="utf-8"/>
        {
          WWADS && <meta name="wwads-cn-verify" content={WWADS} />
        }
        <link
          key="favicon"
          rel="shortcut icon"
          type="image/png"
          href={FAVICON}
        />
        <link key="cdn-preconnect" rel="preconnect" href={CDN_HOST} crossOrigin="true"/>
        {BAIDU_ANALYTIC &&
        <script
          key="baidu"
          dangerouslySetInnerHTML={{
            __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ANALYTIC}";
  hm.defer = true;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
        `,
          }}
        >
        </script>
        }

        {WWADS &&
        <script
          key="wwads"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
var _sr = document.createElement('script');
_sr.type = 'text/javascript';
_sr.async = true;
_sr.src = 'https://wwads.cn/code/install';
(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(_sr);
})();
        `,
          }}
        >
        </script>
        }

      </Head>
      <Header/>
      <div className="mx-4 max-w-3xl md:mx-auto">
        {props.children}
      </div>
    </div>
  );
}

