# text 文本


## 协议

```json
{
  "type": "text",
  "title": "文本",
  "value": "文本",
  "linenumber": "",
  "eventlist": []
}
```
## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | 控件初始值 | string | -- |
| linenumber | 文本显示行数 | number | -- |
| eventlist.trigger | 事件钩子 | enum | -- |

### value
控件初始值，显示文本，取值类型为 `字符串`。

### linenumber
文本显示行数，超过行数以省略号显示。

取值类型为 `number | 字符串数字`，默认值为空，表示不限制显示行数。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
