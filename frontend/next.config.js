const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const CDN_HOST = process.env.CDN_HOST || ''

module.exports = withBundleAnalyzer({
  assetPrefix: process.env.NODE_ENV === 'production' ? CDN_HOST : '',
})
