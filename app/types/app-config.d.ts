declare module 'nuxt/app' {
  interface AppConfig {
    seo?: {
      siteName?: string
    }
    header?: {
      logo?: {
        alt?: string
        light?: string
        dark?: string
      }
      search?: boolean
      links?: Array<{
        label?: string
        to?: string
        icon?: string
        target?: string
      }>
      colorMode?: boolean
    }
    footer?: {
      credits?: string
      colorMode?: boolean
      links?: Array<{
        icon?: string
        to?: string
        target?: string
        'aria-label'?: string
      }>
    }
    toc?: {
      title?: string
      bottom?: {
        title?: string
        edit?: string
        links?: Array<{
          icon?: string
          label?: string
          to?: string
          target?: string
        }>
      }
    }
  }
}

declare module '@nuxt/ui' {
  interface HeaderSlots {
    logo?: any
    center?: any
    panel?: any
  }
}

export {}
