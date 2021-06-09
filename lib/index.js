import Vue from 'vue'
import FormTable from './form-table'

const components = [FormTable]

components.forEach(component => {
  Vue.component(component.name, component)
})

const install = function (Vue, opts = {}) {
  Vue.prototype.$formTableOptions = opts
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
FormTable.install = install
export default FormTable
