# text 文本


# 协议

```json
{
  "type": "text",
  "title": "文本",
  "value": "文本",
  "linenumber": "",
  "eventlist": []
}
```

## value
+ 类型： string
+ 默认： ""

控件初始值，显示文本。

## linenumber
+ 类型： string | number
+ 默认： ""

文本显示行数，超过行数以省略号显示。取值类型为 `number` or `字符串数字`，默认值为空，表示不限制显示行数。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
