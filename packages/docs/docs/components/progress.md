# progress 进度
用于展示操作进度，告知用户当前状态和预期。

## 协议

```json
{
  "type": "progress",
  "title": "进度",
  "value": "",
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| value | 进度条百分比 | number(字符串数字) |  |
| eventlist.trigger | 事件钩子 | enum |  |

### value
进度条百分比，取值类型为字符串数字，"1" 表示 100%，"0.5" 表示 50%。

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
