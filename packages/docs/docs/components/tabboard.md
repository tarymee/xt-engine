# tabboard 标签页
分隔内容上有关联但属于不同类别的数据集合。

## 协议
```json
{
  "type": "tabboard",
  "title": "标签页",
  "cards": [
    {
      "title": "基本信息",
      "content": []
    }
  ]
}
```

## cards
+ 类型： ILayoutViewRule[]
+ 默认： []

定义标签页内容，取值类型为`layout控件协议对象数组`。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
