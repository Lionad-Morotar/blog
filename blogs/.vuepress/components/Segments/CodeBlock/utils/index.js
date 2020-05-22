export const getHumanizedTransformerName = transformer => {
  const names = {
    html: 'HTML',
    js: 'JavaScript',
    css: 'CSS',
  }

  return names[transformer] || transformer
}

export const isInIframe = () => window && window.self !== window.top