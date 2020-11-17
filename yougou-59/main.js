// 导入 vue
import Vue from 'vue'
// 导入 app
import App from './App'
// 导入自己封装的异步请求方法
import myrequest from './utils/request.js'

Vue.config.productionTip = false
// 将方法挂载到 vue 的原型上
Vue.prototype.$http = myrequest

// uniapp 中用来设置当前运行环境
App.mpType = 'app'

// 创建一个 vue 实例
const app = new Vue({
    ...App // 将 App 对象进行展开
})
app.$mount() // 将 vue 实例进行渲染
