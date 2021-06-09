/*
 * @Description: 导出组件
 * @Date: 2021-06-09 12:14:46 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 20:58:40 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
import FormTable from './form-table'

const components = [FormTable]

components.forEach(component => {
  Vue.component(component.name, component)
})

const install = function(Vue, opts = { titleWidth: 120 }) {
  if (!opts?.titleWidth) opts.titleWidth = 120
  Vue.prototype.$formTableOptions = opts
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
FormTable.install = install
export default FormTable
