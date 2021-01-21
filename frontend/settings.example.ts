export const BASE_HOST = 'https://bloghub.fun'

export const CDN_HOST = ''

export const GRAPHQL_API = process.env.NODE_ENV === 'production' ? `${BASE_HOST}/graphql` : 'http://localhost:3000/graphql';

export const BAIDU_ANALYTIC = ''
export const WWADS = ''

export const HOME_PAGE_SIZE = 20;

export const DEFAULT_TWITTER_CARD_IMAGE = `${BASE_HOST}/images/favicon-192x192.png`;

export const FAVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB80lEQVRYCWNoaGBg+rs8qubvqphnf1fG/qcLBtm1PKoGZDcD2HJ6WYxuz/KoGga6+hzdAatinjHQJcjRLUbijzpgaITA5+nB/3epy2Lg3eqy//fpKfw/6az1/0GBw//fS6NJzsZEhcDHSYH/V7DxEcRbZSX+f5gQQJIjSHbA4zLn/19nh8IxyMJbKVb/1wuJgB24VUbi/+9lxIcEyQ542eSJ1YcvGj3gIfS0yhWrGmxZnmoOABm+VkAY7IhrsWb0d8Cf5TH/1/AKgR1wM8mS/g64l2MHtnw1t+D/z9OCaeeAq9Gm/x+XO8PxwyLH/2c8df6v4hT4D7L8QaED0ZaDoo3kNIArO67iEvh/I97i/58VMbR1wFFrtf9nffRQ8HF7jf/roAkQVDD9WhRFtCNIDgFc2RBUNmyWEgeng7NeuvR3ACg+b6dZQxIir+D/30uIK4yoFgIgB7xq8QI7AJROiC2SqeqAZ7VucAd8mhxEVDRQ1QEnnDTBDgAlSFDBBAoVQphkBzytdv3/Y34EHH+fH/7/bZfv/9PuOnDfXwo1ImgxzGEkOwBXOQATB4XCn2XE+R7kCKIcACpatytJYcU7lKX/79NV+H/WW/f/q1Yvon1OUgjAFNOCJioEaGExzMxRBwyCrhmoZ0xEgUETNaDO6UB3zwHlh2fNHX4ajwAAAABJRU5ErkJggg=='

export const HEADER_NAVS = [
  {
    name: 'Github',
    href: 'https://github.com/shidenggui/bloghub',
    rel: 'nofollow',
    prefetch: false,
    className: '',
    target: '_blank',
  },
  {
    name: 'Rss',
    href: 'https://bloghub.fun/feeds',
    rel: 'nofollow',
    prefetch: false,
    className: 'hidden lg:inline',
    target: '_blank',
  },
  {
    name: '作者',
    href: 'https://shidenggui.com',
    rel: '',
    prefetch: false,
    className: '',
    target: '_blank',
  },
  {
    name: '关于',
    href: '/about',
    prefetch: null,
    rel: null,
    className: '',
    target: null,
  },
];

export const ABOUT_PAGE = `
## BlogHub 缘起 

离我在 2015 年第一次搭建博客已经过了好多年了，但惭愧的是这两年才开始认真写博客，
不久前我终于开发了自己的独立博客 [Shidenggui's Blog](https://shidenggui.com)。

在维护博客的过程中，我认识了很多朋友，每次偶遇他人的博文，有时觉得原来世界上竟有人可以这样生活、
原来有人跟我的想法那么接近。

我常常想，那么多有趣、好玩的独立博客，该如何被我们发现呢？这就是 BlogHub 的起源。

## 诞生

在一开始我非常幸运的发现了 timqian 维护的 
[chinese-independent-blogs](https://github.com/timqian/chinese-independent-blogs) 项目，
这样初期数据源问题就解决了。

而去过我博客的朋友会发现，BlogHub 的样式跟我的博客网站很像，
这不是偶然，一开始为了速度，复用了我的博客 90% 的代码。 

因为上面两点的帮助，所以仅仅开发了三天，BlogHub 就完成了。

## 希望

"子曰：有朋自远方来，不亦说乎"，希望 BlogHub 也能让大家发现更多有趣的灵魂，结交更多的朋友。
`

