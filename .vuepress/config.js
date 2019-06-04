module.exports = {
  title: 'MGear',
  description: '媒体链路博客, 前端链接世界',
  base: "/blogs/",
  themeConfig: {
    searchMaxSuggestions: 10,
    logo: './assets/public/img/favicon.svg',
    header: {
      background: {
        // 使用随机变化的背景图案
        useGeo: true
      }
    },
    nav: [
      { text: '网易云', link: 'https://music.163.com/#/user/home?id=64236446' },
      { text: '掘金', link: 'https://juejin.im/user/5b209f666fb9a01e66165c5a' },
      { text: 'Github', link: 'https://github.com/Lionad-Morotar' }
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated'
  }
}
