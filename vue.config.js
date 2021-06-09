/*
 * @Description: vue 项目配置
 * @Date: 2021-06-09 12:14:46 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 20:23:43 +0800
 * @LastEditors: JackChou
 */
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  css: { extract: false },
  outputDir: 'docs',
  publicPath: isProd ? './' : '/',
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    },
    resolve: {
      // 设置别名
      alias: {
        'form-table': path.resolve(__dirname, './lib')
      }
    }
  }
}
