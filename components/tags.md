# tags 标签
用于显示需要根据值显示不同的文本，或者图标的情况。

```json
{
  "type": "tags",
  "title": "标签",
  "value": "",
  "options": [],
  "eventlist": []
}
```

## value
+ 类型：`string`
+ 默认：`""`

控件初始值，控件值支持4种形式：

+ 单值字符串，如: `'1'`，必须要有`options`字段。
+ 单值对象字符串，如: `JSON.stringify({ "key": "1", "text": "启用" })`，不需要有`options`字段。
+ 多值数组字符串，如: `JSON.stringify(['1', '2'])`，必须要有`options`字段。
+ 多值数组对象字符串，如: `JSON.stringify([{ "key": "1", "text": "启用" }, { "key": "0", "text": "停用" }])`，不需要有`options`字段。


## options
```javascript
interface IOption {
  key: string
  text: string
  // 如果数据源中有 type 属性值 则采用 el-tag 控件渲染
  type?: '' | 'success' | 'info' | 'warning' | 'danger' // 对应 el-tag 控件 type 属性 默认 ''
  effect?: 'light' | 'dark' | 'plain' // 对应 el-tag 控件 effect 属性 默认 light
  size?: '' | 'medium' | 'small' | 'mini' // 对应 el-tag 控件 size 属性 默认 mini
}
```
+ 类型：`IOption[]`
+ 默认：`[]`

控件数据源。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
