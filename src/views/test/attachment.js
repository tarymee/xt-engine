/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test",
    "pagedescr": "test"
  },
  "view": {
    "body": {
      "type": "layout",
      "flexdirection": "vertical",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "400px",
        "margin": "30px auto"
      },
      "content": [
        {
          "type": "attachment",
          "titlewidth": "70",
          "title": "文件",
          "placeholder": "6-20个字符，区分大小写",
          "name": "文件",
          "width": "100%",
          "required": "1",
          "maxnumber": "2",
          "accept": "image/png,image/jpg,text/txt,.zip",
          "maxsize": "300",
          "eventlist": [
            {
              "trigger": "onvaluechange",
              "handler": "handle-valuechange"
            },
            {
              "trigger": "onupload",
              "handler": "handle-onupload"
            }
          ]
        },
        {
          "type": "textinput",
          "titlewidth": "70",
          "title": "新密码",
          "placeholder": "6-20个字符，区分大小写",
          "name": "新密码",
          "displaytype": "password",
          "width": "100%",
          "required": "1",
          "eventlist": []
        },
        {
          "type": "textinput",
          "titlewidth": "70",
          "title": "确认密码",
          "placeholder": "6-20个字符，区分大小写",
          "name": "确认密码",
          "displaytype": "password",
          "width": "100%",
          "required": "1",
          "eventlist": []
        },
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "justifyContent": "center",
          "flex": "1",
          "width": "",
          "hidden": "",
          "content": [
            {
              "type": "button",
              "title": "确认",
              "value": "确认",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-save"
                }
              ]
            },
            {
              "type": "button",
              "title": "test",
              "value": "test",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-test"
                }
              ]
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [
      {
        "code": "1454645626748",
        "desc": "初始化",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626747",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              // 为本页面axios注册拦截器
              axios.interceptors.response.use(response => {
                return response
              }, err => {
                let msg
                if (err.response && err.response.data && err.response.data.error_code) {
                  msg = err.response.data.error_code
                } else if (err.response.statusText) {
                  msg = err.response.statusText
                } else {
                  msg = err.message
                }
                page.message.error(msg)
                return Promise.reject(err)
              })
            `
          }
        ]
      }
    ],
    "interface": [],
    "handlers": [
      {
        "code": "handle-test",
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              console.log(eventTarget)
              let ctrl = page.getCtrl('文件')
              console.log(ctrl.value)
              // console.log(ctrl.readonly)
              ctrl.readonly = !ctrl.readonly
              ctrl.required = !ctrl.required
            `
          }
        ]
      },
      {
        "code": "handle-valuechange",
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              console.log(eventTarget)
            `
          }
        ]
      },
      {
        "code": "handle-onupload",
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626777",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              console.log(eventTarget)

              // var formdata = new FormData()
              // formdata.append('file', eventTarget.selectFile)
              // formdata.append('fileName', 'xxxx.png')
              // axios.post('/platserv/FileUpload/SingleFile/uploadFile', formdata, {
              //   headers: {
              //     'Content-Type': 'multipart/form-data'
              //   }
              // }).then((res) => {
              //   console.log(res)
              // })

              eventTarget.handleSuccess({
                filename: eventTarget.selectFile.name,
                url: location.origin + location.pathname + eventTarget.selectFile.name
              })
            `
          }
        ]
      },
      {
        "code": "handle-save",
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              if (!page.validata()) {
                throw Error('validata')
              }
              const oldpassword = page.getCtrl('旧密码').value
              const newpassword = page.getCtrl('新密码').value
              const confirmpassword = page.getCtrl('确认密码').value
              let msg = ''
              if (oldpassword.length < 6 || oldpassword.length > 20) {
                msg = '请输入6-20位字符的旧密码'
              } else if (newpassword.length < 6 || newpassword.length > 20) {
                msg = '请输入6-20位字符的新密码'
              } else if (newpassword !== confirmpassword) {
                msg = '新密码与确认密码不一致'
              }
              if (msg) {
                page.message.error(msg)
                return
              }

              axios.post('/platserv/platAccount/updatePwd', {
                oldpassword: oldpassword,
                newpassword: newpassword
              }).then((res) => {
                if (res.data.resp_data === 'ok') {
                  page.message.success('修改密码成功！')
                  // location.href = '/'
                } else {
                  page.message.error('修改密码失败！')
                }
              })
            `
          }
        ]
      }
    ]
  },
  "businessmodel": []
}
