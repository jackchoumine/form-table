/*
 * @Description: git 提交规范
 * @Date: 2021-06-09 12:14:46 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 13:45:35 +0800
 * @LastEditors: JackChou
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2, // 2 表示必须
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'merge', // 合并分支
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    // 自动部署的BUILD ROBOT的commit信息大写，以作区别
    'subject-case': [0]
  }
}
