/*
 * @Description: 工具函数
 * @Date: 2021-06-09 13:07:07 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 13:27:50 +0800
 * @LastEditors: JackChou
 */
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
export function copyText(content = '', title = '') {
  // NOTE 使用 input 难以调整复制文本的格式，比如换行
  const textarea = document.createElement('textarea')
  textarea.value = typeof content === 'string' ? content.trim() : ''
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('Copy')
    Message.success(`复制${title}成功`)
  } catch (error) {
    Message.error('复制失败，请重试')
  }
  document.body.removeChild(textarea)
}
