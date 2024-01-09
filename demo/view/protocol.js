/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test"
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
          "type": "tabboard",
          "name": "tabboard框架",
          "flexdirection": "vertical",
          "title": "基本信息",
          "height": "300",
          "hidden": "",
          "width": "",
          "flex": "",
          "overflow": "",
          "cards": [
            {
              "title": "基本信息",
              "hidden": "",
              "content": [
                {
                  "type": "progress",
                  "title": "进度",
                  "name": "进度",
                  "displaytype": "",
                  "width": "",
                  "value": "0.5",
                  "eventlist": []
                },
                {
                  "type": "textinput",
                  "titlewidth": "70",
                  "title": "旧密码",
                  "placeholder": "6-20个字符，区分大小写",
                  "name": "旧密码",
                  "displaytype": "password",
                  "width": "100%",
                  "required": "1",
                  "eventlist": []
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
                      "width": "100",
                      "eventlist": [
                        {
                          "trigger": "onclicked",
                          "handler": "handle-save"
                        }
                      ]
                    },
                    {
                      "type": "button",
                      "title": "测试",
                      "value": "测试",
                      "displaytype": "primary",
                      "width": "100",
                      "eventlist": [
                        {
                          "trigger": "onclicked",
                          "handler": "handle-test"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "基本信息2",
              "hidden": "",
              "content": []
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [],
    "interface": [],
    "handlers": [
      {
        "code": "handle-test",
        "title": "测试",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('进度').value = '1'
            `
          }
        ]
      },
      {
        "code": "handle-save",
        "title": "修改密码",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              if (!Page.validata()) {
                throw Error('validata')
              }
              const oldpassword = Page.getCtrl('旧密码').value
              const newpassword = Page.getCtrl('新密码').value
              const confirmpassword = Page.getCtrl('确认密码').value
              let msg = ''
              if (oldpassword.length < 6 || oldpassword.length > 20) {
                msg = '请输入6-20位字符的旧密码'
              } else if (newpassword.length < 6 || newpassword.length > 20) {
                msg = '请输入6-20位字符的新密码'
              } else if (newpassword !== confirmpassword) {
                msg = '新密码与确认密码不一致'
              }
              if (msg) {
                Page.message.error(msg)
                return
              }

              Page.openLoading()
              Page.api.post('/platserv/platAccount/updatePwd', {
                oldpassword: oldpassword,
                newpassword: newpassword
              }).then((res) => {
                if (res.data.resp_data === 'ok') {
                  Page.message.success('修改密码成功！')
                  // location.href = '/'
                } else {
                  Page.message.error('修改密码失败！')
                }
              }).catch((err) => {
                console.error(err)
                let msg = (err.body && err.body.error_code) || err.statusText || err
                Page.message.error(msg)
              }).finally(() => {
                Page.closeLoading()
              })
            `
          }
        ]
      }
    ]
  }
}
