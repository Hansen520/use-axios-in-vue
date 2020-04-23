import Vue from 'vue'
import Router from 'vue-router'
import contact from './pages/contact'


// 注册插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/contact',
      name: 'contact',
      component: contact
    }
  ]
})