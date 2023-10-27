# radio 单选框
在一组备选项中进行单选。

## 协议
```json
{
  "type": "radio",
  "title": "单选控件",
  "value": "",
  "displaytype": "auto",
  "options": [
    {
      "key": "1",
      "disabled": "1",
      "text": "启用"
    },
    {
      "key": "0",
      "disabled": "",
      "text": "停用"
    }
  ],
  "eventlist": []
}
```

## value
+ 类型： string
+ 默认： ""

控件初始值。

## displaytype
同 checkbox 控件。

## options
同 checkbox 控件。

## eventlist.trigger
+ 类型： string
+ 默认： ""



| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |







