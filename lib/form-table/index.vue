<!--
 * @Description: 表单式表格
 * @Date: 2021-06-09 12:37:04 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-09-08 20:36:06 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="j-form-table">
    <div v-if="hasTitleSlot" class="j-form-table-title-box">
      <slot name="title"></slot>
    </div>
    <div v-else-if="title" class="j-form-table-title-box">
      <span class="title-text">{{ title }}</span>
    </div>
    <ul v-if="titleList.length">
      <li
        v-for="(item, index) in titleInfo"
        :key="index"
        :style="{ width: ((item.span || 1) / titleNumPreRow) * 100 + '%' }"
      >
        <div class="j-form-table-title" :style="`width: ${_titleWidth}px;`">
          <Container
            v-if="typeof item.title === 'function'"
            :renderContainer="item.title"
            :data="data"
          />
          <span v-else>
            {{ item.title }}
          </span>
        </div>
        <div
          v-title="item.titleTips"
          v-copy="item.enableCopy"
          class="j-form-table-key"
          :style="`width:calc(100% - ${_titleWidth}px);`"
        >
          <Container
            v-if="typeof item.prop === 'function'"
            :renderContainer="item.prop"
            :data="data"
          />
          <span v-else>
            {{
              (![null, void 0].includes(data[item.prop]) && data[item.prop]) ||
                ''
            }}
          </span>
        </div>
      </li>
    </ul>
    <div v-else class="j-form-table-no-data">暂无数据</div>
  </div>
</template>

<script>
import Container from './container.js'
import { copyText } from './utils/index.js'
import clone from 'clone'
export default {
  name: 'FormTable',
  components: {
    Container
  },
  directives: {
    title: {
      inserted(el, bindings, vnode) {
        const { context: that } = vnode
        const { value = false } = bindings
        if (typeof value === 'function') {
          that.setTile(el, value(that.data))
        } else {
          that.setTile(el, value)
        }
      },
      componentUpdated(el, bindings, vnode) {
        const { context: that } = vnode
        const { value = false } = bindings
        if (typeof value === 'function') {
          that.setTile(el, value(that.data))
        } else {
          that.setTile(el, value)
        }
      }
    },
    copy: {
      inserted(el, bindings) {
        const { value = false } = bindings
        const textContent = el.textContent.trim()
        // 没有内容，不复制
        if (value && textContent) {
          el.fn = () => {
            copyText(textContent)
          }
          el.classList.add('zm-copy')
          el.addEventListener('click', el.fn, false)
        }
      },
      unbind(el, bindings) {
        el.removeEventListener('click', el.fn)
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: Number,
      default: 120
    },
    titleNumPreRow: {
      type: Number,
      default: 3,
      validator: value => {
        const validate = [1, 2, 3, 4, 5, 6].includes(value)
        if (!validate) {
          console.error(
            'titleNumPreRow 表示一行有标题字段对,只能时 1 -- 6 的偶数,默认 3'
          )
        }
        return validate
      }
    },
    titleList: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        const validate = value.every(item => {
          const { title, prop } = item
          return title && prop
        })
        if (!validate) {
          console.log('传入的 titleList 属性的元素必须包含 title  和 prop 属性')
        }
        return validate
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    titleInfo() {
      // NOTE 使用 JSON.stringify 深度复制丢失方法,此处勿用
      // const titleInfo = JSON.parse(JSON.stringify(this.titleList))
      const titleInfo = clone(this.titleList)
      if (titleInfo.some(item => !!item.span)) {
        // NOTE 如何用户有设置每个标题的宽度,就不适配最后一个
        return titleInfo
      }
      const titleNumPreRow = this.titleNumPreRow
      const remainder = titleInfo.length % titleNumPreRow
      if (1 === remainder) {
        titleInfo[titleInfo.length - 1].span = titleNumPreRow
      }
      if (1 < remainder && remainder < titleNumPreRow) {
        titleInfo[titleInfo.length - 1].span = titleNumPreRow - remainder + 1
      }
      return titleInfo
    },
    _titleWidth() {
      return this.titleWidth
        ? this.titleWidth
        : this.$formTableOptions?.titleWidth
    },
    hasTitleSlot() {
      return this.$slots.title
    }
  },
  methods: {
    setTile(el, titleValue) {
      const textContent = el.textContent
      const title = textContent.trim() || '暂无数据'
      el.title = typeof titleValue === 'string' ? titleValue : title
    }
  }
}
</script>
<style lang="scss">
//NOTE 不加 scoped 方便在父组件使用 j-form-table 修改内部样式
.j-form-table {
  div,
  ul,
  li {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  background-color: #fff;
  margin: 20px 0;
  &-title-box {
    display: flex;
    align-items: center;
    height: 46px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 5px 10px;
    .title-text {
      display: inline-block;
      font-weight: bolder;
      font-size: 16px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    border-top: 1px solid#ebeef5;
    border-left: 1px solid #ebeef5;
    li {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;

      .j-form-table-title {
        display: flex;
        box-sizing: border-box;
        display: inline-block;
        justify-content: flex-end;
        height: 100%;
        min-height: 39px;
        padding: 0 10px;
        align-items: center;
        background-color: #cdcdcd3f;
        border-right: 1px solid#ebeef5;
        border-bottom: 1px solid #ebeef5;
        font-weight: 700;
        color: #606266;
        text-align: right;
        font-size: 14px;
        line-height: 39px;
        word-wrap: break-word;
      }

      .j-form-table-key {
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        min-height: 39px;
        padding: 0 10px;
        border-right: 1px solid#ebeef5;
        border-bottom: 1px solid #ebeef5;
        font-size: 14px;
        line-height: 39px;
        word-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  &-no-data {
    border: 1px solid #ebeef5;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
  .zm-copy {
    cursor: copy;
  }
}
</style>
