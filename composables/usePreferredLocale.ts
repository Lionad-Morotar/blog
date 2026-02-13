import type { PreferredLocale } from '~/utils/locale'

export function usePreferredLocale() {
  const locale = useState<PreferredLocale>('preferred-locale', () => 'zh')
  const initialized = useState('preferred-locale-initialized', () => false)

  if (process.client && !initialized.value) {
    const stored = window.localStorage.getItem('preferred-locale')
    if (stored === 'zh' || stored === 'en') locale.value = stored

    watch(locale, (value) => {
      window.localStorage.setItem('preferred-locale', value)
    })

    initialized.value = true
  }

  return locale
}
