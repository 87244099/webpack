# 组件文档
## 目录
- [input](#input)

## <span id='input'>input</span>
### 概述 
常用于界面上的文本框
### 属性
| 名称 | 说明 | 类型 | 默认值 |
| -----| ---- | ---- | ---- |
| type | 表单类型 | 'text','textarea', 'number', 'password' | text |
| value | 表单类型，type为number时，则value为数值类型 | String , Number | '' |
| placeholder | 占位符文字 | String | '' |
| disabled | 禁用表单 | Boolean | false |
| maxlength | 文本最大长度 | Number | - |
| max | 最大值，type为number时起作用 | Number | - |
| min | 最小值，type为number时起作用 | Number | - |
| readonly | 表单只读 | Boolean | false |
| resize | type为textarea时，是否支持自定义表单尺寸 | Boolean | false |
### 事件
| 名称 | 说明 | 类型 | 默认值 |
| ----- | ---- | ---- | ---- |
| focus | 获取焦点 | function(event) | ---- |
| blur | 失去焦点 | function(event) | ---- |
| change | 内容改变 | function(value) | ---- |
