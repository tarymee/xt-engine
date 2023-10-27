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

## value
+ 类型： string
+ 默认： ""

控件初始值。

## options
控件数据源。

## remotesearch
+ 类型： boolean | "1" | "0"
+ 默认： "0"

是否支持远程搜索。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
| onremotesearch | 远程搜索时触发 |


## DEMO
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
