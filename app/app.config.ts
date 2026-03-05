export default defineAppConfig({
  ui: {
    colors: {
      primary: 'red',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-neutral-200 dark:border-neutral-800',
        left: 'text-sm text-neutral-500 dark:text-neutral-400'
      }
    }
  },
  seo: {
    siteName: 'Lionad\'s Blog and KnowledgeBase',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    links: [
      {
        label: 'Posts',
        to: '/articles',
      },
      {
        label: 'Maps',
        to: '/maps',
      },
      {
        label: 'Links',
        to: '/links',
      },
    ],
    colorMode: true,
  },
  footer: {
    credits: 'Copyright © 2024 Lionad - CC-BY-NC-CD-4.0',
    colorMode: true,
    links: [{
      icon: 'i-simple-icons-github',
      to: 'https://github.com/Lionad-Morotar',
      target: '_blank',
      'aria-label': 'Lionad-Morotar on GitHub'
    }, {
      icon: 'i-simple-icons-juejin',
      to: 'https://juejin.cn/user/289926800227694/posts',
      target: '_blank',
      'aria-label': 'Lionad-Morotar on JueJin'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'More',
      links: [
        {
          icon: 'i-heroicons-book-open',
          label: 'RSS',
          to: 'feed.xml',
          target: '_blank',
        }
      ]
    }
  }
})
