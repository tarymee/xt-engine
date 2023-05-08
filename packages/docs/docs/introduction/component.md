# 介绍

## 控件分类
控件可分为以下类型：

+ 基础控件
+ 输入控件
+ 容器控件
+ 数组控件


## 控件通用属性
控件通用属性，所有的控件都会有以下属性：

| 属性名称 | 说明 | 取值类型 | 默认值
| ---- | ---- | ---- | ---- |
| type | 控件类型 | string | "" |
| code | 控件编码 必须唯一 可为空 引擎自动生成 | string | "" |
| title | 控件类型标题 | string | "" |
| name | 控件名称 用于flycode | string | "" |
| value | 默认值 | any |  |
| hidden | 控件是否隐藏 | enum(""/"0"/"1") | "" |
| readonly | 控件是否只读 | enum(""/"0"/"1") | "" |
| style | css样式对象 | object | {} |
| css | css样式 | string | "" |
| class | css类名 | string | "" |
| eventlist | 事件列表 | array | [] |
| eventlist.handler | 事件code | string | "" |
| eventlist.trigger | 事件触发时机 | string | "" |


## 输入控件通用属性
输入控件都会有以下属性：

| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| required | 控件是否必填 | enum(""/"0"/"1") | "" |
| placeholder | 占位文字 | string | "" |
| hiddenclearbtn | 是否能清空数据 | enum(""/"0"/"1") | "" |
| titlewidth | 标题的绝对宽度 | css长度单位 | "30%" |


## 通用属性详解

### title
控件的标题，其显示方式受控件的具体类型和显示模式影响。

当控件放置在表格中后，其标题将会固定显示在表格的表头。


### name
控件名称，用于 flycode 获取控件实例使用。

### value
控件默认值，通过该属性对控件的默认值进行设定。

取值类型基于控件类型有所不同，比如，table/list/foreach 数组型控件则取值类型为 array，textinput/text等大部分控件取值类型为 string。

### hidden

### readonly

### style css class

### eventlist

### required

### placeholder

### hiddenclearbtn

### titlewidth
