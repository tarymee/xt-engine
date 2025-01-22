# list 列表
用于展示多条结构类似的数据，可对数据进行自定义操作。

```json
{
  "type": "list",
  "title": "列表",
  "name": "列表",
  "checkable": "0",
  "pageable": "0",
  "pagesize": "20",
  "rowswidth": "100%",
  "rowsstyle": "card",
  "rows": {
    "type": "layout",
    "content": []
  },
  "frontoperations": [
    {
      "type": "layout",
      "content": []
    }
  ],
  "frontoperationshidden": "",
  "operations": [],
  "rowoperations": [],
  "eventlist": []
}
```


## pageable
同 table 控件。

## pagesize
同 table 控件。

## checkable
同 table 控件。

## operations
同 table 控件。

待开发。

## rowoperations
同 table 控件。

## rows
+ 类型：`ILayoutViewRule`
+ 默认：`{}`

接收一个 layout 结构的控件协议对象，基于控件值多次渲染的控件模板块。

```json
{
  "rows": {
    "type": "layout",
    "flexdirection": "vertical",
    "style": {
      "padding": "16px"
    },
    "content": [
      {
        "type": "image",
        "title": "图片",
        "name": "img",
        "style": {
          "width": "100%",
          "height": "200px"
        },
        "eventlist": []
      },
      {
        "type": "text",
        "title": "名称",
        "name": "name",
        "style": {
          "fontWeight": "bold",
          "fontSize": "16px",
          "margin-top": "8px",
          "margin-bottom": "4px"
        },
        "eventlist": []
      },
      {
        "type": "text",
        "title": "描述",
        "name": "des",
        "style": {
          "overflow": "hidden",
          "text-overflow": "ellipsis",
          "display": "-webkit-box",
          "-webkit-line-clamp": 2,
          "-webkit-box-orient": "vertical",
          "color": "#777",
          "fontSize": "12px"
        },
        "eventlist": []
      }
    ]
  }
}
```

## rowswidth
+ 类型：`string`
+ 默认：`"100%"`

定义循环渲染块的宽度，接收CSS单位值，如 `px` `%` `vw` `vh` 等等。

## rowsstyle
+ 类型：`"card" | ""`
+ 默认：`""`

定义循环渲染块的样式，默认值为空。

| 值 | 说明 |
| ---- | ---- |
| "" | 无样式 |
| card | 展示为卡片样式 |
| ... | 更多样式待开发 |

## frontoperations
+ 类型：`ILayoutViewRule[]`
+ 默认：`[]`

定义列表前置控件，类型为数组，接受控件协议对象。

## frontoperationshidden
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

是否隐藏列表前置控件。

## eventlist.trigger
同 table 控件。


# flycode
支持通过 `page.getCtrl()` 获取控件实例对控件进行 `flycode` 操作，除了支持 [通用方法](flycode/page?id=getctrl) 之外，还额外支持以下方法。

| flycode | 说明 |
| ---- | ---- |
| value | 取值赋值 |
| focusedValue/checkedValue | 获取焦点行/勾选行的值 |
| index/focusedIndex/checkedIndex | 获取所有行/焦点行/勾选行序号 |
| pageable | 获取是否设置分页 |
| pageInfo | 获取/设置分页 |
| setCheck() | 设置行勾选状态 |
| getCheck() | 获取行勾选状态 |
| deleteInScope() | 删除所有行/焦点行/勾选行 |
| append() | 插入行数据 |
| update() | 更新行数据 |
| row/focusedRow/checkedRow/getRowByIndex() | 获取所有行/焦点行/勾选行/传入序号获取行控件 |

## value
同 table 控件。

## focusedValue/checkedValue
同 table 控件。

## index/focusedIndex/checkedIndex
同 table 控件。

## pageable
同 table 控件。

## pageInfo
同 table 控件。

## setCheck()
同 table 控件。

## getCheck()
同 table 控件。

## deleteInScope()
同 table 控件。

## append()
同 table 控件。

## update()
同 table 控件。

## row/focusedRow/checkedRow/getRowByIndex()
同 table 控件。
