# progress 进度
用于展示操作进度，告知用户当前状态和预期。


```json
{
  "type": "progress",
  "title": "进度",
  "value": "",
  "eventlist": []
}
```


## value
+ 类型： string | number
+ 默认： ""

控件初始值，进度条百分比，取值类型为 `number` 或 `字符串数字`，1 表示 100%，0.5 表示 50%。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
