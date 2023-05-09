# link 链接
使用单纯的文字来作为一个按钮功能的控件。

## 协议

```json
{
  "type": "link",
  "title": "链接",
  "value": "",
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | 控件初始值 | string | -- |
| eventlist.trigger | 事件钩子 | enum | -- |

### value
控件初始值，取值类型为 `字符串`，用于设置该链接显示的文字。


### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onclicked | 点击时触发 |
