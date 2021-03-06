/*
 * @Description: 项目入口
 * @Date: 2021-06-09 12:14:25 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 20:23:59 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
import App from './App.vue'
import FormTable from 'form-table'
Vue.use(FormTable, { titleWidth: 120 })

// eslint-disable-next-line vue/require-name-property
new Vue({
  render: h => h(App)
}).$mount('#app')
