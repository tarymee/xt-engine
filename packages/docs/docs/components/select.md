# select 选择器


## 协议

```json
{
  "type": "select",
  "title": "选择器",
  "value": "",
  "remotesearch": "",
  "options": [],
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| value | 控件初始值 | string | -- |
| options | 控件数据源 | array | [] |
| remotesearch | 是否支持远程搜索 | boolean | false |
| eventlist.trigger | 事件钩子 | enum | -- |


### value
控件初始值，取值类型为 `字符串`。

### options
控件数据源

### remotesearch
是否支持远程搜索。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| true | 支持远程搜索 | -- |
| false | 不支持远程搜索 | 是 |
| "1" | 支持远程搜索 | -- |
| "0" | 不支持远程搜索 | 是 |

例子：
```json
{
  "view": {
    "body": {
      "type": "layout",
      "content": [
        {
          "type": "select",
          "title": "选择器",
          "value": "",
          "remotesearch": "1",
          "options": [],
          "eventlist": [
            {
              "trigger": "onremotesearch",
              "handler": "handle-remotesearch"
            }
          ]
        }
      ]
    }
  },
  "presenter": {
    "handlers": [
      {
        "code": "handle-remotesearch",
        "title": "远程搜索",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(eventTarget)

              axios.post('/api/masterserv/protocolEngine/getMetadataObject', {
                objectname: eventTarget.remotesearchText
              }).then((res) => {
                // debugger
                const data = res.data.resp_data || []
                page.getCtrl('选择器').options = data.map((item) => {
                  item.key = item.tablename
                  item.text = item.objectname
                  return item
                })
              })
            `
          }
        ]
      }
    ]
  }
}
```

### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
| onremotesearch | 远程搜索时触发 |
