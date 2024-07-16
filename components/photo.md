# photo 图片上传

```json
{
  "type": "photo",
  "title": "图片上传",
  "value": "",
  "maxnumber": "",
  "maxsize": "",
  "required": "",
  "textual": "",
  "readonly": "",
  "accept": "image/*",
  "eventlist": []
}
```

## value
```typescript
interface IPhotoValue {
  filename: string
  url: string
}
```
+ 类型：`IPhotoValue[]`
+ 默认：`[]`

控件初始值。

## maxlength
定义用法同 [attachment 控件 maxlength 属性](components/attachment?id=maxlength)

## maxsize
定义用法同 [attachment 控件 maxsize 属性](components/attachment?id=maxsize)

## accept
定义用法同 [attachment 控件 accept 属性](components/attachment?id=accept)

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
| onupload | 上传时触发 |

# 示例
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
          "textual": "",
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
