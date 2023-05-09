# layout 布局
用于布局的容器控件，方便快速搭建页面的基本结构，类似于 html 的 div 标签

## 协议

```json
{
  "type": "layout",
  "title": "布局",
  "content": [],
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| content | 布局容器内容 | 控件协议对象数组 | -- |
| eventlist.trigger | 事件钩子 | enum | -- |

### content
定义布局容器内容，取值类型为`控件协议对象数组`。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onclicked | 点击时触发 |


## flycode
