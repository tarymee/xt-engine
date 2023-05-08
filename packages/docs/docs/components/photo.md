# photo 图片上传


## 协议

```json
{
  "type": "photo",
  "title": "图片上传",
  "value": "",
  "maxnumber": "",
  "maxsize": "",
  "accept": "image/*",
  "eventlist": []
}
```

## 协议属性
| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| value | 默认值 | object[] | [] |
| maxlength | 最大图片数量 | number |  |
| maxsize | 单张图片大小限制 | number |  |
| accept | 文件格式 | string | "image/*" |
| eventlist.trigger | 事件钩子 | enum |  |


### value
控件值，取值类型为对象数组。

类型定义：
```typescript
interface SingleValue {
  filename: string;
  url: string;
}
type value = SingleValue[]
```


### maxlength
允许上传的最大图片数量。

取值类型为 `number | 字符串数字`，默认值为空，表示不限制最大图片数量。

### maxsize
允许上传的单张图片大小，单位为 KB，默认值为空，表示不限制。

假如您想要限制单张图片大小为 10M，那么 maxsize: "10485760"


### accept
允许上传的图片文件格式，参考 input 标签 type="file" 的 accept 属性。

以下为参考值：

| 值 | 说明 |
| ---- | ---- |
| "image/*" | 所有图片格式，默认值 |
| "image/png" | png 图片格式 |
| ".jpg, .jpeg, .png" | jpg jpeg png 图片格式 |



### eventlist.trigger
| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
| handle-onupload | 上传时触发 |


上传例子：
```json
{
  "view": {
    "body": {
      "type": "layout",
      "content": [
        {
          "type": "photo",
          "titlewidth": "90",
          "title": "图片",
          "placeholder": "图片",
          "name": "新增/编辑-图片",
          "required": "1",
          "readonly": "",
          "maxnumber": "1",
          "maxsize": "1048576",
          "accept": "image/*",
          "eventlist": [
            {
              "trigger": "onupload",
              "handler": "handle-onupload"
            }
          ]
        }
      ]
    }
  },
  "presenter": {
    "handlers": [
      {
        "code": "handle-onupload",
        "title": "图片上传",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(eventTarget)
              console.log(eventTarget.selectFile)

              // 方式一：需要提前注入 flycode 上传图片方法
              inject.uploadFileToOSS(eventTarget.selectFile).then(res => {
                console.log(res)
                eventTarget.handleSuccess({
                  filename: res.objectKey,
                  url: res.imageUrl
                })
              }).catch(error => {
                console.error(error)
                eventTarget.handleFail()
              })

              // 方式二：普通方式上传
              const formdata = new FormData()
              formdata.append('file', eventTarget.selectFile)
              formdata.append('filename', eventTarget.selectFile.name)
              axios.post('/platserv/FileUpload/SingleFile/uploadFile', formdata, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then((res) => {
                eventTarget.handleSuccess({
                  filename: res.data.resp_data.filename,
                  url: res.data.resp_data.url
                })
              }).catch(() => {
                console.error(error)
                eventTarget.handleFail()
              })
            `
          }
        ]
      }
    ]
  }
}
```
