# textinput 文本输入框
文本输入框

## 协议

```json
{
  "type": "textinput",
  "title": "文本输入框",
  "value": "",
  "displaytype": "",
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": ""
    }
  ]
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| displaytype | 控件展示方式 | enum | input |
| maxlength | 最大输入字符数 | number | -- |
| minrow | 最小行数 | number | 2 |
| maxrow | 最大行数 | number | 6 |
| eventlist.trigger | 事件钩子 | enum | -- |

### value
控件初始值，显示文本框内文字，取值类型为 `字符串`。

### displaytype
控件展示方式，默认值为 `input`。

| 值 | 说明 |
| ---- | ---- |
| input | 常规，默认值，展示为单行文本输入框 |
| textarea | 展示为多行文本输入框 |
| password | 展示为密码框 |

### maxlength
控件允许输入的最大字符数，如果超过，则校验不通过。

取值类型为 `number | 字符串数字`。

### minrow/maxrow
当 displaytype === textarea 时，定义多行文本框的最小和最大行数。

取值类型为 `number | 字符串数字`。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
