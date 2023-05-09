# popview 弹窗


## 协议

```json
{
  "type": "popview",
  "title": "弹窗",
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| eventlist.trigger | 事件钩子 | enum | -- |



### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onopen | 打开时触发 |
| onclose | 关闭时触发 |
