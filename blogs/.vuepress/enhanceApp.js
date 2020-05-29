import CodeBlock from './components/segments/CodeBlock/Editor.vue'
import VueP5 from './components/segments/P5'
import WHRatio from './components/segments/WHRatio'
import Spark from './components/segments/Spark'
import Worker from './components/segments/Worker'

// eslint-disable-next-line
import siteOnloadScript from './scripts'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
    Vue.config.ignoredElements = ['css-doodle']
    Vue.component('vue-p5', VueP5)
    Vue.component('WHRatio', WHRatio)
    Vue.component('CodeBlock', CodeBlock)
    Vue.component('Spark', Spark)

    Vue.use(Worker)
}
