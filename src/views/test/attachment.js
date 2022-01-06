/* eslint-disable */
export default {
  "pageinfo": {
    "code": "attachment",
    "title": "attachment",
    "pagedescr": "attachment"
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
          "code": "attachment-8115001595939472",
          "name": "文件",
          "title": "文件",
          "height": "",
          "hidden": "",
          "width": "",
          "flex": "",
          "overflow": "",
          "eventlist": []
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
              page.getCtrl('进度').value = '1'
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
  },
  "businessmodel": []
}
