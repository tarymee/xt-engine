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

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | 按钮文字 | string | -- |
| displaytype | 按钮显示样式 | enum | -- |
| plain | 是否朴素按钮 | boolean | false |
| round | 是否圆角按钮 | boolean | false |
| icon | 按钮图标 | string | -- |
| size | 按钮尺寸 | enum | small |
| eventlist.trigger | 事件钩子 | enum | -- |


### value
控件初始值，对应按钮显示文字，取值类型为 `字符串`。

### displaytype
按钮显示样式。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| "" | 默认样式 | 是 |
| primary | 主要样式 | -- |
| success | 成功样式 | -- |
| info | 信息样式 | -- |
| warning | 警告样式 | -- |
| danger | 危险样式 | -- |

### plain
是否朴素按钮。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| true | 是朴素按钮 | -- |
| false | 非朴素按钮 | 是 |
| "1" | 是朴素按钮 | -- |
| "0" | 非朴素按钮 | 是 |

### round
是否圆角按钮。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| true | 是圆角按钮 | -- |
| false | 非圆角按钮 | 是 |
| "1" | 是圆角按钮 | -- |
| "0" | 非圆角按钮 | 是 |

### icon
按钮图标。
支持 element-ui 图标：https://element.eleme.cn/2.15/#/zh-CN/component/icon

### size
按钮尺寸。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| big | -- | -- |
| middle | -- | -- |
| small | -- | 是 |
| mini | -- | -- |

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onclicked | 点击时触发 |
| onload | 加载时触发 |
