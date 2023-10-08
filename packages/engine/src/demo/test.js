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
      "style": {},
      "content": [
        {
          "type": "button",
          "value": "test",
          "eventlist": [
            {
              "trigger": "onclicked",
              "script": `
                console.log('test')
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
