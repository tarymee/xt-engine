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
        // "width": "400px",
        // "margin": "30px auto"
      },
      "content": [
        {
          "type": "layout",
          "flexdirection": "vertical",
          "hidden": "",
          "style": {
            "width": "96%",
            "height": "400px",
            "border": "1px solid #999",
            "margin": "20px auto"
          },
          "content": [
            {
              "type": "webview",
              "title": "webview",
              "name": "webview",
              "value": "",
              "eventlist": [
                {
                  "trigger": "onload",
                  "handler": "handle-onload"
                }
              ]
            }
          ]
        },
        {
          "type": "button",
          "value": "test",
          "eventlist": [
            {
              "trigger": "onclicked",
              "handler": "handle-test"
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
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('webview').value = 'http://172.16.72.91:8080/#/?protocol=form'
            `
          }
        ]
      },
      {
        "code": "handle-onload",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(eventTarget)
              // 注入window变量
              eventTarget.contentWindow.aaa = 'aaa'
            `
          }
        ]
      }
    ]
  },
  "businessmodel": []
}
