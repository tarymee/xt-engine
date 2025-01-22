# tree 选择树
用清晰的树层级结构展示信息，可供选择节点。

```json
{
  "type": "tree",
  "title": "树控件",
  "multiselectable": "0",
  "displaytype": "custom",
  "expandmodel": "rootexpand",
  "intermediateselectmode": "individual",
  "options": [],
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": ""
    },
    {
      "trigger": "onload",
      "handler": ""
    }
  ]
}
```

## value
+ 类型：`string`
+ 默认：`""`

控件初始值。


## options
```javascript
interface ITags {
  text: string
  type?: '' | 'success' | 'info' | 'warning' | 'danger' // 对应 el-tag 控件 type 属性
  effect?: 'light' | 'dark' | 'plain' // 对应 el-tag 控件 effect 属性
}

interface IOption {
  key: string
  parentkey: string
  text: string
  tags?: ITags[] // 额外显示树节点标签
}
```
+ 类型：`IOption[]`
+ 默认：`[]`

控件数据源。

## multiselectable
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

是否多选。

## displaytype
+ 类型：`"custom" | "navigation"`
+ 默认：`"custom"`

控件显示样式。

| 值 | 说明 |
| ---- | ---- |
| custom | 常规输入样式，使用下拉方式进行选值 |
| navigation | 导航栏样式 |

## expandmodel
+ 类型：`"rootexpand" | "noexpand" | "allexpand"`
+ 默认：`"rootexpand"`

控制节点展开方式。

| 值 | 说明 |
| ---- | ---- |
| rootexpand | 展开根节点 |
| noexpand | 不展开 |
| allexpand | 全部展开 |

## intermediateselectmode
+ 类型：`"gather" | "individual" | "disable" | "shortcut" | "related" | "highest"`
+ 默认：`"individual" | "gather"`

控件取值模式。

单选时，支持以下值，默认值为 `individual`。

| 值 | 说明 |
| ---- | ---- |
| individual | 父子无关联 各自独立取值 |
| disable | (不能选非叶子节点 取值叶子节点) 暂不实现 |

多选时，支持以下值，默认值为 `gather`。

| 值 | 说明 |
| ---- | ---- |
| gather | 父子有关联 共同取值 半选不取 |
| individual | 父子无关联 各自独立取值 |
| disable | 父子有关联 不能选非叶子节点 取值叶子节点 |
| shortcut | 父子有关联 取值叶子节点 |
| related | 父子有关联 取值非叶子节点 如果只有一级 最高节点同样也是叶子节点时 则该级视为最高级 要取值 半选不取 |
| highest | 父子有关联 取值最高节点 未实现 |

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
