# number 数字输入框
数字输入框

```json
{
  "type": "number",
  "title": "数字输入框",
  "value": "",
  "valuetype": "",
  "max": "",
  "min": "",
  "required": "",
  "textual": "",
  "readonly": "",
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": ""
    }
  ]
}
```

## value
+ 类型：`string | number`
+ 默认：`""`

控件初始值，显示数字框内数字。

## valuetype
+ 类型：`"number" | "string"`
+ 默认：`"number"`

定义控件值接受值和输入值类型。

| 值 | 说明 |
| ---- | ---- |
| number | 接受值和输入值类型为数字（当无值是为空字符串） |
| string | 接受值和输入值类型为字符串（当无值是为空字符串） |

## max / min
+ 类型：`string | number`
+ 默认：`""`

控件允许输入的最大值和最小值，如果超过，则校验不通过。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
