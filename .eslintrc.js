/*
 * @Description: eslint 规则
 * @Date: 2021-01-20 14:26:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-05-28 10:58:56 +0800
 * @LastEditors: JackChou
 */
// NOTE 安装 eslint、 prettier，并把 vetur 设置为默认的格式化方式，否则可能有冲突
// NOTE 不要启用 .editorconfig 配置，否则此处的规则不生效
// NOTE 保留,后续可能需要
// "husky": {
//     "hooks": {
//       "pre-commit": "npm run lint-staged"
//     }
//   },
//   "lint-staged": {
//     "**/*.{js,vue}": [
//       "npm run lint"
//     ]
//   },
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  plugins: ['vue'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // NOTE 异步加载路由报错：Parsing error: Unexpected token import
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '2018',
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    semi: [2, 'never'],
    'no-param-reassign': [2, { props: false }],
    'no-new': 2, // 禁用new创建对象
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 强制一行的最大长度
    'max-len': [1, 120],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    // NOTE 使用 void 0 代替 undefined
    'no-undefined': 2,
    // 禁止出现未使用过的变量
    // NOTE 不要全局关闭，在文件内和当前行关闭该规则的检查: cmd + .
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'no-var': 2,
    'prefer-const': 2,
    'spaced-comment': [2, 'always'],
    'vue/require-name-property': 2,
    'vue/multiline-html-element-content-newline': 0,
    // 一行多少属性
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true,
        },
      },
    ],
    // 自闭和标签
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never', // 通用的标签
          normal: 'never', // 知名的html元素
          component: 'always', // vue组件
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      2,
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['/el-(.*)/', '/router(.*)/', 'component', 'keep-alive'],
      },
    ],
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1, // 属性缩进
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // https://eslint.vuejs.org/rules/attributes-order.html
    'vue/attributes-order': [
      2,
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/order-in-components': [
      2,
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
}
