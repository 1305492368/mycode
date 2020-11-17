import Vue from 'vue'
import App from './App'
// 引入公共请求方法
import request from '@/utils/request'
import store from './store'


// 把$request添加到Vue原型属性
Vue.prototype.$request = request 
// 把$store添加到Vue原型属性
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
