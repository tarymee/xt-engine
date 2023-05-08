# date 日期选择器


## 协议

```json
{
  "type": "date",
  "title": "日期选择器",
  "value": "",
  "format": "yyyy-MM-dd",
  "unit": "date",
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| value | 默认值 | number(字符串时间戳) | "yyyy-MM-dd" |
| format | 日期格式 | enum |  |
| unit | 显示类型 | enum | "date" |
| eventlist.trigger | 事件钩子 | enum |  |

### value
默认值，接受字符串时间戳。


### format
使用 format 指定显示时间格式

| 值 | 说明 |
| ---- | ---- |
| yyyy-MM-dd | 年月日 |
| yyyy-MM-dd HH:mm:ss | 年月日时分秒 |
| yyyy-MM | 年月 |


### unit
显示类型。
<!-- https://element.eleme.cn/2.15/#/zh-CN/component/date-picker -->

| 值 | 说明 |
| ---- | ---- |
| date | 日期选择 |
| year | 年份选择 |
| month | 月份选择 |


### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
