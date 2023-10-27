# button 按钮


## 协议

```json
{
  "type": "button",
  "title": "按钮",
  "value": "按钮",
  "eventlist": [
    {
      "trigger": "onclicked",
      "handler": ""
    }
  ]
}
```

## value
+ 类型： string
+ 默认： ""

控件初始值，对应按钮显示文字。

## displaytype
+ 类型： "primary" | "success" | "info" | "warning" | "danger"
+ 默认： ""

按钮显示样式，对应 element-ui 按钮 type 属性。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| "" | 默认样式 | 是 |
| primary | 主要样式 | -- |
| success | 成功样式 | -- |
| info | 信息样式 | -- |
| warning | 警告样式 | -- |
| danger | 危险样式 | -- |

## plain
+ 类型： boolean | "1" | "0"
+ 默认： "0"

是否朴素按钮。


## round
+ 类型： boolean | "1" | "0"
+ 默认： "0"

是否圆角按钮。

## icon
+ 类型： string
+ 默认： ""

按钮图标。
支持 element-ui 图标：https://element.eleme.cn/2.15/#/zh-CN/component/icon

## size
+ 类型： "mini" | "small" | "middle" | "big"
+ 默认： "small"

按钮尺寸。


## eventlist.trigger
+ 类型： string
+ 默认： ""



| 值 | 说明 |
| ---- | ---- |
| onclicked | 点击时触发 |
| onload | 加载时触发 |
