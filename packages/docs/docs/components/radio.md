# radio 单选框
在一组备选项中进行单选

## 协议

```json
{
  "type": "radio",
  "title": "单选控件",
  "value": "",
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
  "eventlist": []
}
```

### value 默认值
初始值，字符串单值类型。

### displaytype
选项值排列方式，默认值为 `auto`。

| 值 | 说明 |
| ---- | ---- |
| auto | 常规，默认值，选项值按顺序水平排列 |
| n=1/2/3... | 字符串数字，选项值以每行 n 项排列 |




### eventlist 事件

| 值 | 说明 |
| ---- | ---- |
| onvaluechange | 值改变时触发 |
| onload | 加载时触发 |







