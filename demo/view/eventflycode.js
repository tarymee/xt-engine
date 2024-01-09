/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test"
  },
  "view": {
    "body": {
      "type": "layout",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "80%",
        "margin": "16px auto"
      },
      "content": [
        {
          "type": "layout",
          "flex": "",
          "hidden": "",
          "style": {
            // "flex-direction": "row"
          },
          "content": [
            {
              "type": "radio",
              "name": "投放对象",
              "title": "投放对象",
              "value": "",
              "titlewidth": "110",
              "displaytype": "auto",
              "style": {
                "width": "100%"
              },
              "options": [
                {
                  "key": JSON.stringify({
                    "modulekey": "customervisit"
                  }, null, 2),
                  "text": "初始投放[品牌商/经销商/促销导购]"
                },
                {
                  "key": JSON.stringify({}, null, 2),
                  "text": "扩展投放"
                }
              ],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "script": `
                    const a = page.getCtrl('投放对象').value
                    page.getCtrl('投放对象协议').value = a
                  `
                }
              ]
            },
            {
              "type": "textinput",
              "name": "投放对象协议",
              "title": "投放对象协议",
              "titlewidth": "110",
              "displaytype": "textarea",
              "readonly": "1",
              "minrow": "5",
              "value": "",
              "style": {
                "width": "100%"
              },
              "eventlist": []
            },
            {
              "type": "radio",
              "name": "客户属性",
              "title": "客户属性",
              "value": "",
              "titlewidth": "110",
              "displaytype": "auto",
              "style": {
                "width": "100%"
              },
              "options": [
                {
                  "key": JSON.stringify({
                    "name": "444"
                  }, null, 2),
                  "text": "初始客户属性[终端客户/经销商客户/分销商客户]"
                },
                {
                  "key": JSON.stringify({
                    "name": "555"
                  }, null, 2),
                  "text": "扩展客户属性"
                }
              ],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "script": `
                    const a = page.getCtrl('客户属性').value
                    page.getCtrl('客户属性协议').value = a
                  `
                }
              ]
            },
            {
              "type": "textinput",
              "name": "客户属性协议",
              "title": "客户属性协议",
              "titlewidth": "110",
              "displaytype": "textarea",
              "readonly": "1",
              "minrow": "5",
              "value": "",
              "style": {
                "width": "100%"
              },
              "eventlist": []
            }
          ]
        },
        {
          "type": "button",
          "value": "确定",
          "eventlist": [
            {
              "trigger": "onclicked",
              "script": `
                const a = page.getCtrl('投放对象协议').value
                const b = page.getCtrl('客户属性协议').value
                console.log(a)
                console.log(b)
              `
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
    "handlers": []
  },
  "businessmodel": []
}
