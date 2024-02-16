export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  seo: {
    siteName: 'Lionad\'s Blog and Knowledgebase',
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
        label: 'Gists',
        to: '/gists',
      },
      {
        label: 'Links',
        to: '/_links',
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
          to: 'todo',
          target: '_blank',
        }
      ]
    }
  }
})
