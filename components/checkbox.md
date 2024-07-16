# checkbox 多选框
一组备选项中进行多选。

```json
{
  "type": "checkbox",
  "title": "多选框控件",
  "value": [],
  "displaytype": "auto",
  "required": "",
  "textual": "",
  "readonly": "",
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
+ 类型：`string[]`
+ 默认：`[]`

控件初始值。

## displaytype
+ 类型：`"auto" | number`
+ 默认：`"auto"`

选项值排列方式。

| 值 | 说明 |
| ---- | ---- |
| auto | 常规，选项值按顺序水平排列 |
| number | 选项值以每行 n 项排列 |

## options
```typescript
interface Ioption {
  key: any
  text: string
  disabled?: string // 选项值是否不可选
}
```
+ 类型：`Ioption[]`
+ 默认：`[]`

控件数据源选项。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |







