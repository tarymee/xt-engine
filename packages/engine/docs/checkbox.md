# checkbox
多选框控件

## 示例
暂无

## 属性说明

```json
{
  "type": "checkbox",
  "code": "checkbox-1",
  "title": "多选框控件",
  "value": [],
  "displaytype": "",
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
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": ""
    },
    {
      "trigger": "onload",
      "handler": ""
    }
  ]
}
```

### displaytype 样式

选项值排列方式，默认值为 `auto`

| 值          | 说明                          |
| ----------- | ---------------------------- |
| auto        | 常规，默认值，选项值按顺序水平排列 |
| n=1/2/3...  | 字符串数字，选项值以每行n列排列   |

### value 值
数组类型


### eventlist 事件









