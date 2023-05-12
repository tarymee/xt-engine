# checkbox 多选框
一组备选项中进行多选

## 协议

```json
{
  "type": "checkbox",
  "title": "多选框控件",
  "value": [],
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
## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | 控件初始值 | any[] | [] |
| displaytype | 选项值排列方式 | string | auto |
| options | 数据源选项 | object[] | [] |
| eventlist.trigger | 事件钩子 | enum | -- |

### value
控件初始值，取值类型为 `数组类型`。

### displaytype
选项值排列方式，默认值为 `auto`。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| auto | 常规，选项值按顺序水平排列 | 是 |
| number | 选项值以每行 n 项排列 | -- |

### options
控件数据源选项，接收对象数组。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |






