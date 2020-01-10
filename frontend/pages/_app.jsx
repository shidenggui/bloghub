import '../styles/tailwindcss.css'
// import NProgress from 'nprogress'
// import Router from 'next/router'
//
//
// Router.events.on('routeChangeStart', url => {
//   console.log(`Loading: ${url}`)
//   NProgress.start()
// })
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}
