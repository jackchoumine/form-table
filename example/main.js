/*
 * @Description: 项目入口
 * @Date: 2021-06-09 12:14:25 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 13:10:14 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
import App from './App.vue'
import FormTable from '../lib/index'
Vue.use(FormTable)

// eslint-disable-next-line vue/require-name-property
new Vue({
  render: h => h(App)
}).$mount('#app')
