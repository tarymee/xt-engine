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

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| cards | 定义标签页内容 | layout控件协议对象数组 | -- |
| eventlist.trigger | 事件钩子 | enum | -- |

### cards
定义标签页内容，取值类型为`layout控件协议对象数组`。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
