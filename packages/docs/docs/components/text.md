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
| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| value | 文本 | string |  |
| linenumber | 文本显示行数 | number |  |
| eventlist.trigger | 事件钩子 | enum |  |

### value
显示文本。

### linenumber
文本显示行数，超过行数会以省略号显示。

取值类型为字符串数字，默认值为空，表示不限制显示行数。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
