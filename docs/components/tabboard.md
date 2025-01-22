# tabboard 标签页
分隔内容上有关联但属于不同类别的数据集合。

```json
{
  "type": "tabboard",
  "title": "标签页",
  "value": "",
  "cards": [
    {
      "title": "基本信息",
      "hidden": "",
      "content": []
    },
    {
      "title": "用户表格",
      "hidden": "",
      "content": []
    }
  ]
}
```

## value
+ 类型：`number`
+ 默认：`""`

初始选中哪个 `tab标签页`。
可以使用 `flycode` 动态获取/切换标签页。

示例：
```js
// 获取当前展示的标签页序号
const index = page.getCtrl('标签页').value

// 切换到第 2 个标签页
page.getCtrl('标签页').value = 1
```

## cards
+ 类型：`ILayoutViewRule[]`
+ 默认：`[]`

定义标签页内容，取值类型为 `layout控件协议对象数组`。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | tabboard 标签页切换时触发 |
