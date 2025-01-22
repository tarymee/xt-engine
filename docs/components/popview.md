# popview 弹窗
专用于弹窗的`子视图`控件，只在表单协议中的 `view.subviews` 中使用，不能在其他容器中配置。
`子视图弹窗`中的控件，在`子视图弹窗`打开时创建，关闭时销毁。
`子视图弹窗`打开后，`子视图弹窗`和`主视图`之间的数据可以无缝共享，随时相互存取。

```json
{
  "type": "popview",
  "title": "弹窗",
  "name": "",
  "value": "",
  "wrapwidth": "",
  "fullscreen": "",
  "content": [],
  "operations": [],
  "eventlist": []
}
```

## value
+ 类型：`any`
+ 默认：`""`

专属于 `popview` 控件的内存值，当 `popview` 弹出时创建，关闭时销毁。
当 `popview` 被打开时，可以使用 `flycode` 赋值 `popview` 所需要使用的数据，这样当需要使用该数据时可以用 `flycode` 获取，当 `popview` 被关闭时该数据会同步被销毁，没有副作用。

示例：
```js
// 打开子视图弹窗
page.openPopview('弹窗') // 等价于 page.getCtrl('弹窗').hidden = false
// 为子视图弹窗赋值
page.getCtrl('弹窗').value = '1'
```

## wrapwidth
+ 类型：`string`
+ 默认：`"50%"`

`子视图弹窗`外部总体宽度，类型为`CSS长度单位`，如果是`px`单位则`px`可省略。
`子视图弹窗`内部容器宽度默认为`外部总体宽度 - 左右内边距`。

## height
+ 类型：`string`
+ 默认：`"auto"`

`子视图弹窗`内部容器高度，类型为 `CSS长度单位`，如果是 `px` 单位则 `px` 可省略。

## fullscreen
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

`子视图弹窗`是否全屏展示，如果是则 `wrapwidth` 属性不起作用。

## content
```typescript
interface IviewRule {
  type: string
  title: string
  content: IviewRule[]
  [propName: string]: any
}
```

+ 类型：`IviewRule[]`
+ 默认：`[]`

定义`子视图弹窗`内容，取值类型为`控件协议对象数组`，可多重嵌套。

## operations
+ 类型：`IButtonViewRule[]`
+ 默认：`[]`

定义底部按钮，取值类型为`按钮控件协议对象数组`。

```json
{
  "operations": [
    {
      "type": "button",
      "text": "确 定",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    },
    {
      "type": "button",
      "text": "取消",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    }
  ]
}
```

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onopen | 打开时触发 |
| onclose | 关闭时触发 |
