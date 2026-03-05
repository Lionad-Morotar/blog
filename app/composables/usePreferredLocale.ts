import type { PreferredLocale } from '~/utils/locale'

export function usePreferredLocale() {
  // 简化实现，避免 hydration 问题
  const locale = useState<PreferredLocale>('preferred-locale', () => 'zh')

  // 只在客户端且已挂载后访问 localStorage
  onMounted(() => {
    const stored = window.localStorage.getItem('preferred-locale')
    if (stored === 'zh' || stored === 'en') {
      locale.value = stored
    }

    watch(locale, (value) => {
      window.localStorage.setItem('preferred-locale', value)
    })
  })

  return locale
}
