/* eslint-disable */
export default {
  "pageinfo": {
    "code": "tabboard",
    "title": "tabboard",
    "pagedescr": "tabboard"
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
          "type": "tabboard",
          "code": "tabboard-8115001595939472",
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
                  "type": "textinput",
                  "code": "14049334561561",
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
                  "titlewidth": "70",
                  "title": "新密码",
                  "placeholder": "6-20个字符，区分大小写",
                  "name": "",
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
                  "name": "",
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
                  "name": "",
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
                  "name": "",
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
                  "name": "",
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
                  "name": "",
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
                  "name": "",
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
                      "code": "1404564654561561",
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
              "hidden": "1",
              "content": [
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
        "desc": "测试",
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
              page.getCtrl('确认密码').value = '1'
              // page.getCtrl('tabboard框架').hidden = true
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
              console.log(page)
              // page.getCtrl('新密码').value = '1'
            `
          }
        ]
      }
    ]
  },
  "businessmodel": []
}
