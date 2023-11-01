# attachment 附件上传


# 协议
```json
{
  "type": "attachment",
  "title": "附件上传",
  "value": "",
  "maxnumber": "",
  "maxsize": "",
  "accept": "",
  "eventlist": []
}
```

## value
+ 类型： IAttachmentValue[]

```typescript
interface IAttachmentValue {
  filename: string
  url: string
}
```

+ 默认： []

控件初始值。


## maxlength
+ 类型： string
+ 默认： ""

允许上传的最大文件数量，默认值为空字符串，表示不限制最大文件数量。

## maxsize
+ 类型： string
+ 默认： ""

允许上传的单个文件大小，单位为 KB，默认值为空字符串，表示不限制。

假如您想要限制单个文件大小为 10M，那么 maxsize: "10485760"

## accept
+ 类型： string
+ 默认： ""

允许上传的文件格式，参考 input 标签 type="file" 的 accept 属性定义。

以下为参考值：

| 值 | 说明 |
| ---- | ---- |
| "" | 允许所有文件格式 |
| "image/*" | 所有图片格式 |
| "image/png" | png 图片格式 |
| ".jpg, .jpeg, .png" | jpg jpeg png 图片格式 |


## eventlist.trigger
+ 类型： string
+ 默认： ""



| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
| onupload | 上传时触发 |


# DEMO
```json
{
  "view": {
    "body": {
      "type": "layout",
      "content": [
        {
          "type": "attachment",
          "title": "文件",
          "placeholder": "文件",
          "name": "新增/编辑-文件",
          "required": "1",
          "readonly": "",
          "maxnumber": "1",
          "maxsize": "1048576",
          "accept": "",
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
        "title": "附件上传",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(eventTarget)
              console.log(eventTarget.selectFile)

              // 方式一：需要提前注入 flycode 上传文件方法
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
