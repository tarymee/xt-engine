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

### value
初始值，字符串类型。

### displaytype
控件展示方式，默认值为 `text`。

| 值 | 说明 |
| ---- | ---- |
| text | 常规，默认值，展示为单行文本输入框 |
| textarea | 展示为多行文本输入框 |
| password | 展示为密码框 |


### eventlist 事件

| 值 | 说明 |
| ---- | ---- |
| onvaluechange | 值改变时触发 |
