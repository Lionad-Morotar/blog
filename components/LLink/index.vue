<template>
  <template v-if="!props.type">
    <a
      :id="slotContent"
      :href="to"
      rel="noopener noreferrer"
      target="_blank"
      @click.prevent.stop="showpage"
    ><span v-if="props.label" v-text="props.label" /> <slot v-else /></a>
  </template>
  <template v-if="props.type === 'blockquote'">
    <blockquote>
      <p>
        <a
          :id="slotContent"
          :href="to"
          rel="noopener noreferrer"
          target="_blank"
          @click.prevent.stop="showpage"
        ><span v-if="props.label" v-text="props.label" /> <slot v-else /></a>
      </p>
    </blockquote>
  </template>
  <template v-if="props.type === 'h5'">
    <h5 style="display: content">
      <a
        :id="slotContent"
        :href="to"
        rel="noopener noreferrer"
        target="_blank"
        @click.prevent.stop="showpage"
      >
        <span v-if="props.label" v-text="props.label" />
        <slot v-else />
      </a>
    </h5>
  </template>
</template>

<script>
import {
  reactive,
  defineComponent,
  onMounted,
  nextTick,
  onScopeDispose,
} from 'vue'

// 获取文件大小
const getOSSFilesize = async (url) => {
  // const url = `https://mgear-file.oss-cn-shanghai.aliyuncs.com/Image%20Scrubber.html`
  const filename = url.match(/[^\\/]*$/)[0]
  const filesize = await fetch(
    `http://faas.lionad.art/getmeta?name=${filename}`
  )
    .then((res) => res.text())
    .then((res) => +res)
  return filesize
}

// 获取HTML源码
const getHTML = async (url) => {
  // TODO use dompurify
  // HTML 源码清洗，仅保留 HTML 和 CSS
  const secureHTML = (html) =>
    html
      .replace(/<!--[^-]*-->/gim, '')
      .replace(/<script[^>]*>/gim, ' <!-- ')
      .replace(/<\/script[\s]*>/gim, ' --> ')
      .replace(/<!--[^-]*-->/gim, '')
      .replace(/(<a\s+[^>]*)href=/gim, '$1')

  return await fetch(url)
    .then((res) => res.text())
    .then((res) => secureHTML(res))
}

// MAIN
const frameClassname = 'linkpage fullscreen'
const frameClassnameWithDot = '.linkpage'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'h5',
    },
    to: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const slots = useSlots()
    // TODO GZIP to reduce filesize
    // TODO auto sourceURL
    const data = reactive({
      loading: false,
      slotContent: '',
    })
    const showpage = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log(props)
      if (props.to) {
        data.loading = true
        try {
          const threshold = 100 * 1000
          const filesize = await getOSSFilesize(props.to)
          if (filesize < threshold) {
            await this.display()
          } else if (props.source) {
            window.open(props.source)
          } else {
            alert('资源体积过大，暂不予展示，敬请谅解')
          }
        } finally {
          data.loading = false
        }
      } else {
        window.open(props.source)
      }
    }
    const display = async () => {
      const html = await getHTML(props.to)
      const $iframe = document.createElement('iframe')
      $iframe.setAttribute('frameborder', '0')
      $iframe.setAttribute('class', frameClassname)
      $iframe.setAttribute('srcdoc', html)
      $iframe.setAttribute(
        'style',
        'width: 100vw; height: 100vh; z-index: 999'
      )

      document.body.append($iframe)
      const container = document.querySelector(frameClassnameWithDot)
      const innerDoc = container.shadowRoot || container.document || container

      const listener = ({ keyCode }) => {
        if (keyCode === 27) {
          $iframe && $iframe.remove()
        }
      }
      document.addEventListener('keydown', listener)
      innerDoc && innerDoc.addEventListener('keydown', listener)

      const clean = () => {
        $iframe && $iframe.remove()
        listener &&
          (document.removeEventListener('keydown', listener),
          innerDoc && innerDoc.addEventListener('keydown', listener))
      }
      await nextTick()
      disableInnerLink()
      onScopeDispose(clean)
    }
    const disableInnerLink = () => {
      const container = document.querySelector(frameClassnameWithDot)
      const innerDoc = container.shadowRoot || container.document || container
      const alinks = innerDoc ? [...innerDoc.querySelectorAll('a')] : []
      alinks.map((a) => a.removeAttribute('href'))
    }

    onMounted(() => {
      const nameNode = slots.default
      const safe = (text) => text.toLowerCase().replace(/\s+/g, '-')
      if (nameNode) {
        data.slotContent = safe(nameNode.text || '')
      }
    })

    return {
      props,
      showpage,
      display,
      disableInnerLink,
    }
  },
})
</script>
