import VueP5 from './components/segments/P5'
import WHRatio from './components/segments/WHRatio'
import Spark from './components/segments/Spark'
import Compare from './components/segments/Compare'
import Worker from './components/segments/Worker'
import JJ from './components/segments/JJ'

import utils from './components/utils'

import './styles/devices.scss'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
    Vue.config.ignoredElements = ['css-doodle', 'flow', 'name', 'time']
    Vue.component('vue-p5', VueP5)
    Vue.component('WHRatio', WHRatio)
    Vue.component('Spark', Spark)
    Vue.component('Compare', Compare)
    Vue.component('JJ', JJ)

    Vue.use(Worker)

    Vue.prototype.$utils = utils
}
