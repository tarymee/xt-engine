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
+ 类型： IviewRule[]
+ 默认： []

```typescript
interface IviewRule {
  type: string
  title?: string
  value?: any
  content?: IviewRule[]
  [propName: string]: any
}
```

定义布局容器内容，取值类型为`控件协议对象数组`，可多重嵌套。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onclicked | 点击时触发 |


# flycode
