import Fragment from 'vue-fragment'

import Highlight from './components/Highlight.vue'
import VueP5 from './components/segments/P5'
import WHRatio from './components/segments/WHRatio'
import Spark from './components/segments/Spark'
import Compare from './components/segments/Compare'
import Worker from './components/segments/Worker'
import FPS from './components/segments/FPS'
import JJ from './components/segments/JJ'
import Link from './components/segments/Link'
import Frame from './components/segments/Frame'
import Keyboard from './components/segments/Keyboard'

import utils from './components/utils'

import './styles/devices.styl'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Fragment.Plugin)

  Vue.config.ignoredElements = ['css-doodle', 'flow', 'name', 'time', 'pixel', 'hide',]
  Vue.component('vue-p5', VueP5)
  Vue.component('WHRatio', WHRatio)
  Vue.component('Spark', Spark)
  Vue.component('Compare', Compare)
  Vue.component('FPS', FPS)
  Vue.component('JJ', JJ)
  Vue.component('Link', Link)
  Vue.component('Frame', Frame)
  Vue.component('Keyboard', Keyboard)
  Vue.component('Highlight', Highlight)
  Vue.component('Code', Highlight)

  Vue.use(Worker)

  Vue.prototype.$utils = utils
}
