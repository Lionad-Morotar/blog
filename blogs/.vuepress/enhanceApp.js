import VueP5 from './components/segments/P5/index.vue'
import WHRatio from './components/segments/WHRatio/index.vue'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.config.ignoredElements = ['css-doodle']
  Vue.component('vue-p5', VueP5)
  Vue.component('WHRatio', WHRatio)
}
