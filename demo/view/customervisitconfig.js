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
      "content": [
        {
          "type": "layout",
          "title": "",
          "name": "表单layout",
          "style": {
            // "padding": "30px 16px",
            "flexDirection": "column",
            "flexWrap": "wrap"
          },
          "content": [
            {
              "key": "manage.visit.max.size",
              "value": "100",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": "最大拜访流数量"
            },
            {
              "key": "manage.visit.step.max.size",
              "value": "30",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": "最大拜访步骤数量"
            },
            {
              "key": "manage.visit.step.effective.size",
              "value": "15",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": "最大拜访步骤有效数量"
            },
            {
              "key": "manage.visit.cache.max-age",
              "value": "60",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": "拜访流缓存时长（分钟）"
            },
            {
              "key": "lost.visit.close",
              "value": "0",
              "required": "",
              "titlewidth": "180",
              "type": "select",
              "options": [
                {
                  "key": "1",
                  "text": "是"
                },
                {
                  "key": "0",
                  "text": "否"
                }
              ],
              "field_type": "text",
              "title": "是否关闭失访"
            },
            {
              "key": "competely.visit.switch.onoff",
              "value": "0",
              "required": "",
              "titlewidth": "180",
              "type": "select",
              "options": [
                {
                  "key": "1",
                  "text": "是"
                },
                {
                  "key": "0",
                  "text": "否"
                }
              ],
              "field_type": "text",
              "title": "是否开启跨店拜访"
            },
            {
              "type": "layout",
              "title": "",
              "name": "",
              "style": {
                "width": "100%",
                "flex-direction": "row",
                "font-weight": "bold",
                "padding": "15px 0",
                "margin": "15px",
                "border-bottom": "1px solid #eee"
              },
              "content": [
                {
                  "type": "text",
                  "title": "",
                  "value": "♦",
                  "style": {
                    "font-weight": "bold",
                    "margin-right": "5px",
                    "color": "#1a85ff"
                  },
                  "eventlist": []
                },
                {
                  "type": "text",
                  "title": "",
                  "value": "访销配置",
                  "style": {
                    "font-weight": "bold"
                  },
                  "eventlist": []
                }
              ]
            },
            {
              "key": "customervisit.open",
              "type": "radio",
              "title": "是否开启访销配置",
              "displaytype": "",
              "required": "",
              "titlewidth": "180",
              "value": "1",
              "options": [
                {
                  "key": "1",
                  "text": "是"
                },
                {
                  "key": "0",
                  "text": "否"
                }
              ],
              "eventlist": []
            },
            {
              "key": "customer.delivery.rule.protocol",
              "value": "{\"modulekey\":\"customervisit\",\"modulename\":\"客户拜访\",\"moduleversion\":\"v1.0\",\"apply\":[{\"user\":\"sales\",\"range\":[\"sales\",\"distribution\",\"promotion\"]}],\"releaseRange\":[{\"title\":\"品牌商\",\"appcode\":\"sales\",\"basicSql\":\"select member.orgstructid as submitop, member.orgname as submitter, userinfo.phonenumber as phone, position.positionname as position, member.codepath as codepath, org.fullname as org from pl_orgstruct member join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid and member.status = 1 and member.platstatus = 1 join pl_orgstruct post on member.parentorgstructid = post.orgstructid join pl_orgstruct org on member.orgid = org.orgstructid and org.orgstructtypeid = 1 left join pl_position position on post.positionid = position.positionid\",\"dimensions\":[{\"title\":\"投放职位\",\"dimension\":\"position\",\"option\":\"in\",\"whereColum\":\"post.positionid in ($value)\",\"existSql\":\"\",\"pagecode\":\"modulekey:path\"},{\"title\":\"营销组织\",\"dimension\":\"organization\",\"option\":\"batch_like\",\"whereColum\":\"org.codepath like any (array[$value])\",\"existSql\":\"\",\"pagecode\":\"modulekey:path\"}]},{\"title\":\"经销商\",\"appcode\":\"distribution\",\"basicSql\":\"select member.orgstructid as submitop, member.orgname as submitter, position.positionname as position, userinfo.phonenumber as phone, dmsorg.orgname as belong_distributor, sfaorg.codepath, sfaorg.fullname as org from ka_kq_channelcustomers kkc join pl_orgstruct dmsorg on kkc.id = dmsorg.orgstructid and kkc.cooperativestatus = 1 and kkc.status = 1 and kkc.platstatus = 1 join pl_orgstruct post on dmsorg.orgstructid = post.parentorgstructid join pl_orgstruct member on post.orgstructid = member.parentorgstructid and member.orgtypeid = 205 and member.status = 1 and member.platstatus = 1 join pl_orgstruct sfaorg on kkc.saleareaid = sfaorg.orgstructid left join pl_position position on post.positionid = position.positionid left join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid left join pl_dictionary dic on dic.dickey = kkc.channeltype and dic.platstatus = 1 left join pl_dictionary path on dic.keypath like path.keypath || '%'\",\"dimensions\":[{\"title\":\"投放职位\",\"dimension\":\"position\",\"option\":\"in\",\"whereColum\":\"post.positionid in ($value)\",\"existSql\":\"\",\"pagecode\":\"modulekey:path\"},{\"title\":\"营销组织\",\"dimension\":\"organization\",\"option\":\"batch_like\",\"whereColum\":\"sfaorg.codepath like any (array[$value])\",\"existSql\":\"\",\"pagecode\":\"modulekey:path\"}]},{\"title\":\"促销导购\",\"appcode\":\"promotion\",\"basicsql\":\"select member.orgid, member.orgstructid as submitop, member.orgname as submitter, userinfo.phonenumber as phone, position.positionname as position, member.codepath as codepath, org.fullname as org, store.storename as associate_store, kkc.channelname as belong_distributor from pl_orgstruct member join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid and member.orgstructtypeid = 3 and member.status = 1 and member.platstatus = 1 join pl_orgstruct post on member.parentorgstructid = post.orgstructid join pl_orgstruct org on post.parentorgstructid = org.orgstructid left join pl_position position on post.positionid = position.positionid left join ka_kq_channelcustomers kkc on kkc.id = userinfo.distrbutorid and kkc.status = 1 and kkc.platstatus = 1 left join kx_pmm_storerepresentative kps on kps.representativeid = member.orgstructid left join kx_kq_store store on store.id = kps.storeid\",\"dimensions\":[{\"title\":\"投放职位\",\"dimension\":\"position\",\"option\":\"in\",\"wherecolum\":\"post.positionid in ($value)\",\"existsql\":\"\",\"pagecode\":\"modulekey:path\"},{\"title\":\"促销组织\",\"dimension\":\"organization\",\"option\":\"batch_like\",\"wherecolum\":\"org.codepath like any (array[$value]) \",\"existsql\":\"\",\"pagecode\":\"modulekey:path\"}]}]}",
              "required": "1",
              "titlewidth": "180",
              "type": "textinput",
              "displaytype": "textarea",
              "field_type": "json",
              "title": "投放范围协议"
            },
            {
              "key": "customer.property.rule.protocol",
              "value": "{\"modulekey\":\"customervisit\",\"modulename\":\"客户拜访\",\"moduleversion\":\"v1.0\",\"protocolVersion\":\"v1.0.0\",\"title\":\"客户属性限定协议\",\"configList\":[{\"customerType\":\"905324680615956480\",\"title\":\"终端客户\",\"pageCodeItem\":{\"pagecodeAPP\":\"1107455351944515677\",\"pagecodeH5\":\"1562754942865903616\"},\"customerSql\":\"select channeltype, storetype, manual_tags from kx_kq_store where id = ${customerid}\",\"customerCategoryKey\":\"channeltype\",\"customerPropertyRange\":[{\"key\":\"channeltype\",\"title\":\"渠道类型\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"893269583996260404\",\"desc\":\"\"},\"matchOp\":\"op_rule_in\",\"customerDataHandle\":{\"extraSql\":\"\",\"convert\":\"\",\"jsonField\":\"\"}},{\"key\":\"storetype\",\"title\":\"终端类型\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"893269583996260403\",\"desc\":\"kx_manual_tag=893269583996260403\"},\"matchOp\":\"op_rule_in\"},{\"key\":\"manual_tags\",\"title\":\"手动标签类型\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"1027799349763117152\",\"desc\":\"kx_manual_tag=1027799349763117152\"},\"matchOp\":\"op_rule_in\",\"customerDataHandle\":{\"convert\":\"json\",\"jsonField\":\"key\"}}]},{\"customerType\":\"905324761813487616\",\"title\":\"经销商客户\",\"pageCodeItem\":{\"pagecodeAPP\":\"1108210888374095965\",\"pagecodeH5\":\"1563003724761272320\"},\"customerSql\":\"select channeltype from ka_kq_channelcustomers where id = ${customerid}\",\"customerCategoryKey\":\"channeltype\",\"customerPropertyRange\":[{\"key\":\"channeltype\",\"title\":\"经销商类型\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"893288512944738328\",\"desc\":\"dictCode=893288512944738328\"},\"matchOp\":\"op_rule_in\"}]},{\"customerType\":\"905324761813487717\",\"title\":\"分销商客户\",\"pageCodeItem\":{\"pagecodeAPP\":\"1500648191882825822\",\"pagecodeH5\":\"1562754942865903616\"},\"customerSql\":\"select distributortype from kx_separate_distributor where id = ${customerid}\",\"customerCategoryKey\":\"distributortype\",\"customerPropertyRange\":[{\"key\":\"distributortype\",\"title\":\"分销商类型\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"1495581148309491810\",\"desc\":\"kx_distributor_type_tag=1495581148309491810\"},\"matchOp\":\"op_rule_in\"},{\"key\":\"distributorlevel\",\"title\":\"分销商级别\",\"ctrltType\":\"selectbox\",\"required\":false,\"mutilSelect\":true,\"optionSetting\":{\"type\":\"dict\",\"exp\":\"1495581148309491809\",\"desc\":\"\"},\"matchOp\":\"op_rule_in\"}]}]}",
              "required": "1",
              "titlewidth": "180",
              "type": "textinput",
              "displaytype": "textarea",
              "field_type": "json",
              "title": "客户属性协议"
            },
            {
              "key": "customervisit.signin.settings",
              "type": "tree",
              "titlewidth": "180",
              "title": "拜访流进店签到场景",
              "required": "",
              "value": "",
              "options": [
                {
                  "key": "last.visit.summary",
                  "text": "上次拜访小结"
                }
              ],
              "eventlist": []
            },
            {
              "key": "customervisit.signout.settings",
              "type": "checkbox",
              "titlewidth": "180",
              "title": "拜访流离店签退场景",
              "required": "",
              "value": "",
              "options": [
                {
                  "key": "stay.duration",
                  "text": "在店时长"
                },
                {
                  "key": "visit.execute",
                  "text": "拜访执行项"
                }
              ],
              "eventlist": []
            },
            {
              "key": "customervisit.location.deviation.open",
              "type": "radio",
              "title": "定位偏差开关",
              "displaytype": "",
              "required": "",
              "titlewidth": "180",
              "value": "1",
              "options": [
                {
                  "key": "1",
                  "text": "开"
                },
                {
                  "key": "0",
                  "text": "关"
                }
              ],
              "eventlist": []
            },
            {
              "key": "manage.visit.max.size",
              "value": "0",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": "定位偏差小于(m)"
            },
            {
              "key": "",
              "value": "说明：配置值为0，视为无偏差范围限制。",
              "required": "",
              "readonly": "1",
              "titlewidth": "180",
              "type": "textinput",
              "field_type": "text",
              "title": ""
            },
            {
              "key": "customervisit.duration.check.open",
              "type": "radio",
              "title": "在店时长校验开关",
              "displaytype": "",
              "required": "",
              "titlewidth": "180",
              "value": "1",
              "options": [
                {
                  "key": "1",
                  "text": "开"
                },
                {
                  "key": "0",
                  "text": "关"
                }
              ],
              "eventlist": []
            },
            {
              "key": "customervisit.purpose.open",
              "type": "select",
              "title": "拜访目的",
              "displaytype": "",
              "required": "",
              "titlewidth": "180",
              "value": "1",
              "options": [
                {
                  "key": "1",
                  "text": "开(关联拜访实例)"
                },
                {
                  "key": "2",
                  "text": "开(不关联拜访实例)"
                },
                {
                  "key": "0",
                  "text": "关"
                }
              ],
              "eventlist": []
            },
            {
              "type": "layout",
              "title": "",
              "name": "",
              "style": {
                "width": "100%",
                "flex-direction": "row",
                "font-weight": "bold",
                "padding": "15px 0",
                "margin": "15px",
                "border-bottom": "1px solid #eee"
              },
              "content": [
                {
                  "type": "text",
                  "title": "",
                  "value": "♦",
                  "style": {
                    "font-weight": "bold",
                    "margin-right": "5px",
                    "color": "#1a85ff"
                  },
                  "eventlist": []
                },
                {
                  "type": "text",
                  "title": "",
                  "value": "促销导购拜访流配置",
                  "style": {
                    "font-weight": "bold"
                  },
                  "eventlist": []
                }
              ]
            },
            {
              "key": "promotion.open",
              "type": "radio",
              "title": "是否开启促销导购拜访流配置",
              "displaytype": "",
              "required": "",
              "titlewidth": "180",
              "value": "0",
              "options": [
                {
                  "key": "1",
                  "text": "开"
                },
                {
                  "key": "0",
                  "text": "关"
                }
              ],
              "eventlist": []
            },
            {
              "key": "promotion.customer.delivery.rule",
              "value": "",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "displaytype": "textarea",
              "field_type": "json",
              "title": "投放范围协议"
            },
            {
              "key": "promotion.customer.property.rule",
              "value": "",
              "required": "",
              "titlewidth": "180",
              "type": "textinput",
              "displaytype": "textarea",
              "field_type": "json",
              "title": "客户属性协议"
            },
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
        "title": "初始化",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `

            `
          }
        ]
      }
    ],
    "interface": [],
    "handlers": []
  }
}
