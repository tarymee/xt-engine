# textinput 文本输入框
文本输入框


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


## value
+ 类型： string
+ 默认： ""

控件初始值，显示文本框内文字。

## displaytype
+ 类型： "input" | "textarea" | "password"
+ 默认： "input"

控件展示方式。

| 值 | 说明 |
| ---- | ---- |
| input | 展示为单行文本输入框 |
| textarea | 展示为多行文本输入框 |
| password | 展示为密码框 |

## maxlength
+ 类型： string | number
+ 默认： ""

控件允许输入的最大字符数，如果超过，则校验不通过。

## minrow/maxrow
+ 类型： string | number
+ 默认： ""

当 displaytype === textarea 时，定义多行文本框的最小和最大行数。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
