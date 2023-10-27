# tree 选择树
用清晰的树层级结构展示信息，可供选择节点。

## 协议
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
控件初始值，取值类型为 `字符串`。


## multiselectable
是否多选。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| true | 多选 | -- |
| false | 单选 | 是 |
| "1" | 多选 | -- |
| "0" | 单选 | 是 |

## displaytype
控件显示样式。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| custom | 常规输入样式，使用下拉方式进行选值 | 是 |
| navigation | 导航栏样式 | -- |

## expandmodel
控制节点展开方式。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| rootexpand | 展开根节点 | 是 |
| noexpand | 不展开 | -- |
| allexpand | 全部展开 | -- |

## intermediateselectmode
控件取值模式。

多选时，支持以下值，默认值为 `gather`。

| 值 | 说明 | 是否默认值 |
| ---- | ---- |---- |
| gather | 父子有关联 共同取值 半选不取 | 是 |
| individual | 父子无关联 各自独立取值 | -- |
| disable | 父子有关联 不能选非叶子节点 取值叶子节点 | -- |
| shortcut | 父子有关联 取值叶子节点 | -- |
| related | 父子有关联 取值非叶子节点 如果只有一级 最高节点同样也是叶子节点时 则该级视为最高级 要取值 半选不取 | -- |
| highest | 父子有关联 取值最高节点 未实现 | -- |


单选时，支持以下值，默认值为 `individual`。

| 值 | 说明 | 是否默认值 |
| ---- | ---- | ---- |
| individual | 父子无关联 各自独立取值 默认 | 是 |
| disable | (不能选非叶子节点 取值叶子节点) 暂不实现 | -- |

## options
控件数据源。


## eventlist.trigger
+ 类型： string
+ 默认： ""


| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 值改变时触发 |
