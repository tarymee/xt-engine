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
      "code": "layout-8161770481264333",
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
          "code": "14049334561561",
          "titlewidth": "70",
          "title": "文件",
          "placeholder": "6-20个字符，区分大小写",
          "name": "文件",
          "width": "100%",
          "required": "1",
          "maxnumber": "",
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
          "code": "140493345621561",
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
          "code": "140493345461561",
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
          "code": "layout-8166354650481264333",
          "flexdirection": "horizontal",
          "justifyContent": "center",
          "flex": "1",
          "width": "",
          "hidden": "",
          "content": [
            {
              "type": "button",
              "code": "1404933544224561561",
              "title": "确认",
              "value": "确认",
              "displaytype": "primary",
              "width": "100",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-save"
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
            "code": "1402930156032626777",
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
              const file = page.getCtrl('文件')
              console.log(file)
              console.log(eventTarget)


              // page.confirm('确定启用所选帐号？', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消'
              // }).then(() => {
              //   axios.post('/platserv/platAccount/enable', {
              //     plataccountcodes: checkedValue.map(item => item.plataccountcode)
              //   }).then((res) => {
              //     page.message.success('启用成功！')
              //     page.runEvent('表格-加载数据')
              //   })
              // }).catch(() => { })


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
                name: eventTarget.selectFile.name,
                url: 'eventTarget.selectFile.name'
              })
            `
          }
        ]
      },
      {
        "code": "handle-save",
        "desc": "修改密码",
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
