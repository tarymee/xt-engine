# layout 布局
用于布局的容器控件，方便快速搭建页面的基本结构，类似于 html 的 div 标签。

```json
{
  "type": "layout",
  "title": "布局",
  "content": [],
  "eventlist": []
}
```


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


定义布局容器内容，取值类型为`控件协议对象数组`，可多重嵌套。
可以使用`flycode`对`content`进行赋值，改变其内容，这对于动态生成页面非常有用。

示例：
```js
// 把布局容器内的内容改为一个 textinput 控件
page.getCtrl('布局').setProp('content', [{
  type: 'textinput'
  value: ''
}])
```

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onclicked | 点击时触发 |
