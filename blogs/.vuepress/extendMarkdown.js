/* 原生懒加载插件 */
function imageLazyLoadPlugin(md) {
    const rule = md.renderer.rules.image
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        token.attrSet('loading', 'lazy')
        return rule(tokens, idx, options, env, self)
    }
}

function extendMarkdown(md) {
    md.use(require('markdown-it-katex'))
    md.use(require('markdown-it-toc-done-right'))
    md.use(imageLazyLoadPlugin)
}

function chainMarkdown(config) {
    const { PLUGINS } = require('@vuepress/markdown')
    const originalLinkPlugin = require('@vuepress/markdown/lib/link.js')

    /* 去除外链后面的图标 */
    config.plugins.delete(PLUGINS.CONVERT_ROUTER_LINK)
    const linkPlugin = function(md) {
        const result = originalLinkPlugin.apply(this, arguments)
        const rule = md.renderer.rules.link_close
        md.renderer.rules.link_close = function() {
            return rule.apply(this, arguments).replace('<OutboundLink/>', '')
        }
        return result
    }
    const defaultOpts = [
        {
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    ]
    config.plugin(PLUGINS.CONVERT_ROUTER_LINK).use(linkPlugin, defaultOpts)
}

module.exports = {
    chainMarkdown,
    extendMarkdown
}
