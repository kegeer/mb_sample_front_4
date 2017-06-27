// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import * as filters from '@/filters'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
// NProgress
import NProgress from 'nprogress'  // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
import 'normalize.css/normalize.css' // normalize.css 样式格式化
import './assets/scss/index.scss' // 全局自定义的css样式
// mockjs模拟的所有请求
import './mock/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI)

Object.keys(filters).forEach(key => [
  Vue.filter(key, filters[key])
])
// 权限判断
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          const roles = res.data.role
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next(to.path) // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()//
        } else {
          next({ path: '/401', query: { noGoBack: true } })
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
