# date 日期选择器

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


## value
+ 类型： string
+ 默认： ""

控件初始值，取值类型为 `字符串时间戳`。

## format
+ 类型： "yyyy-MM-dd" | "yyyy-MM" | "yyyy-MM-dd HH:mm:ss"
+ 默认： "yyyy-MM-dd"

使用 format 指定显示时间格式。

| 值 | 说明 |
| ---- | ---- |
| yyyy-MM-dd | 年月日 |
| yyyy-MM-dd HH:mm:ss | 年月日时分秒 |
| yyyy-MM | 年月 |


## unit
+ 类型： "date" | "year" | "month"
+ 默认： "date"

显示类型。
<!-- https://element.eleme.cn/2.15/#/zh-CN/component/date-picker -->

| 值 | 说明 |
| ---- | ---- |
| date | 日期选择 |
| year | 年份选择 |
| month | 月份选择 |

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
