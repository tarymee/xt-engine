# table 表格
用于展示多条结构类似的数据，可对数据进行自定义操作。

# 协议
```json
{
  "type": "table",
  "title": "表格",
  "name": "表格",
  "checkable": "0",
  "pageable": "0",
  "pagesize": "20",
  "fixednumber": "0",
  "columns": [],
  "operations": [],
  "rowoperations": [],
  "eventlist": []
}
```

## pageable
+ 类型： boolean | "1" | "0"
+ 默认： "0"

是否支持分页。

## pagesize
+ 类型： string
+ 默认： "20"

如果支持分页，定义每页条数

## checkable
+ 类型： boolean | "1" | "0"
+ 默认： "0"

是否支持勾选。

## fixednumber
+ 类型： string | number
+ 默认： "0"

冻结前几列。

## columns
+ 类型： IBaseOrInputViewRule[]
+ 默认： []

表格定义列，取值类型为 `基础/输入型控件协议对象数组`。


```json
{
  "columns": [
    {
      "type": "link",
      "title": "产品",
      "name": "productname",
      "width": "150",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    },
    {
      "type": "text",
      "title": "产品编码",
      "name": "productcode",
      "width": "150"
    },
    {
      "type": "select",
      "title": "单位",
      "name": "unit",
      "placeholder": "选择单位",
      "required": "1",
      "readonly": "",
      "width": "120",
      "hiddenclearbtn": "1",
      "options": [
        {
          "key": "bottle",
          "text": "瓶"
        },
        {
          "key": "box",
          "text": "箱"
        }
      ]
    }
  ]
}
```

## operations
+ 类型： IButtonViewRule[]
+ 默认： []

定义顶部操作按钮，取值类型为`按钮控件协议对象数组`。

按钮控件的 `readonly` 属性可接收专属 table 的关键字。

| 值 | 说明 |
| ---- | ---- |
| tableCheckedNumberIsEqualToZero | 按钮在 table 勾选时可用 |
| tableCheckedNumberIsNotEqualToOne | 按钮在 table 勾选一个时可用 |

```json
{
  "operations": [
    {
      "type": "button",
      "text": "新增(按钮一直可用)",
      "readonly": "",
      "eventlist": []
    },
    {
      "type": "button",
      "text": "删除(按钮一直不可用)",
      "readonly": "1",
      "eventlist": []
    },
    {
      "type": "button",
      "text": "table 勾选时可用",
      "readonly": "tableCheckedNumberIsEqualToZero",
      "eventlist": []
    },
    {
      "type": "button",
      "text": "table 勾选一个时可用",
      "readonly": "tableCheckedNumberIsNotEqualToOne",
      "eventlist": []
    }
  ]
}
```


## rowoperations
+ 类型： IButtonViewRule[]
+ 默认： []

定义行操作按钮，取值类型为`按钮控件协议对象数组`。

```json
{
  "rowoperations": [
    {
      "type": "button",
      "text": "编辑",
      "eventlist": []
    }
  ]
}
```

## eventlist.trigger
+ 类型： string
+ 默认： ""


| 值 | 说明 |
| ---- | ---- |
| onchecked | 勾选时触发 |
| onload | 加载时触发 |



# flycode

| flycode | 说明 |
| ---- | ---- |
| value | 取值赋值 |
| focusedValue/checkedValue | 获取焦点行/勾选行的值 |
| index/focusedIndex/checkedIndex | 获取所有行/焦点行/勾选行序号 |
| pageable | 获取是否设置分页 |
| pageInfo | 获取/设置分页 |
| setCheck() | 设置行勾选状态 |
| deleteInScope() | 删除所有行/焦点行/勾选行 |
| append() | 插入行数据 |
| update() | 更新行数据 |
| row/focusedRow/checkedRow/getRowByIndex() | 获取所有行/焦点行/勾选行/传入序号行控件 |
| getColByName() | 传入列名获取列控件 |
| getOperationCtrl() | 获取操作按钮控件 |
| getRowoperationCtrl() | 获取行操作按钮控件 |

## value
+ 类型：

```typescript
interface RowValue {
  [propName: string]: any
}
get value (): RowValue[]
set value (data: RowValue[]): void
```

对 table 控件进行取值、赋值。

```js
// 取值
const value = page.getCtrl('表格').value
console.log(value)

// 赋值
page.getCtrl('表格').value = [
  {
    productname: '可口可乐'
  },
  {
    productname: '百事可乐'
  }
]
```

## focusedValue/checkedValue
+ 类型：

```typescript
get focusedValue (): RowValue | null
get checkedValue (): RowValue[]
```

获取焦点行/勾选行的值。

```js
// 当点击某一行时触发事件 获取焦点行的值
const focusedValue = page.getCtrl('表格').focusedValue
console.log(focusedValue)

// 获取勾选行的值
const checkedValue = page.getCtrl('表格').checkedValue
console.log(checkedValue)
```

## index/focusedIndex/checkedIndex
+ 类型：

```typescript
get index (): number[]
get focusedIndex (): number | null
get checkedIndex (): number[]
```

获取所有行/焦点行/勾选行序号。

```js
// 获取所有行的序号
const index = page.getCtrl('表格').index
console.log(index)

// 当点击某一行时触发事件 获取焦点行的序号
const focusedIndex = page.getCtrl('表格').focusedIndex
console.log(focusedIndex)

// 获取勾选行的序号
const checkedIndex = page.getCtrl('表格').checkedIndex
console.log(checkedIndex)
```

## pageable
+ 类型：

```typescript
get pageable (): boolean
```

获取是否设置分页。

```js
const pageable = page.getCtrl('表格').pageable
console.log(pageable)
```

## pageInfo
+ 类型：

```typescript
interface PageInfo {
  __itemcount: number | string;
  __pageindex: number | string; // 第一页为 1 而不是 0
  __pagesize: number | string;
}
get pageInfo (): PageInfo
set pageInfo (pageInfo: PageInfo): void
```

在支持分页的情况下，获取/设置分页信息。

```js
// 获取当前分页信息
const pageInfo = page.getCtrl('表格').pageInfo
console.log(pageInfo)

// 设置当前分页信息
page.getCtrl('表格').pageInfo = {
  __itemcount: 100,
  __pageindex: 1,
  __pagesize: 20
}
```

## setCheck()
+ 类型：

```typescript
type FunctionSetCheck = (value: boolean, index: number): void
```

设置行勾选状态。

```js
// 设置第一行为勾选状态
page.getCtrl('表格').setCheck(true, 0)
```


## deleteInScope()
+ 类型：

```typescript
type FunctionDeleteInScope = (scope: 'all' | 'focused' | 'checked'): void
```

删除所有行/焦点行/勾选行。

```js
// 删除所有行
page.getCtrl('表格').deleteInScope('all')

// 删除焦点行
page.getCtrl('表格').deleteInScope('focused')

// 删除勾选行
page.getCtrl('表格').deleteInScope('checked')
```


## append()
+ 类型：

```typescript
type FunctionAppend = (data: RowValue | RowValue[], type: 'head' | 'tail'): void
```

插入行数据。

| type值 | 说明 |
| ---- | ---- |
| head | 从行头插入数据 |
| tail | 从行尾插入数据 |


```js
// 从行头插入一条空数据
page.getCtrl('表格').append([
  {
    productname: ''
  }
], 'head')

// 从行尾同时插入两条数据
page.getCtrl('表格').append([
  {
    productname: '可口可乐'
  },
  {
    productname: '百事可乐'
  }
], 'tail')
```



## update()
+ 类型：

```typescript
type FunctionUpdate = (data: RowValue | RowValue[], index: number | number[]): void
```

更新行数据。

```js
// 同时更新第1行和第3行数据
page.getCtrl('表格').update([
  {
    productname: '可口可乐'
  },
  {
    productname: '百事可乐'
  }
], [0, 2])

// 更新第1行
page.getCtrl('表格').update({
  productname: '可口可乐'
}, 0)
```


## row/focusedRow/checkedRow/getRowByIndex()
+ 类型：

```typescript
interface Ctrl {
  get value (): any
  set value (data: any): void

  get hidden (): boolean
  set hidden (data: boolean): void

  get options (): any[]
  set options (data: any[]): void
  ...
}

interface ArrayRowCtrl {
  index: number
  getCtrl(name: string): Ctrl
}

get row (): ArrayRowCtrl[]
get focusedRow (): ArrayRowCtrl | null
get checkedRow (): ArrayRowCtrl[]

type FunctionGetRowByIndex = (index: number | number[]): ArrayRowCtrl | ArrayRowCtrl[] | null
```

获取行控件。

取得行控件后，可通过 getCtrl() 方法获取该行下某一单元格的控件实例，从而对单元格控件进行 flycode 操作。

| 值 | 说明 |
| ---- | ---- |
| row | 获取所有行控件 |
| focusedRow | 获取焦点行控件 |
| checkedRow | 获取勾选行控件 |
| getRowByIndex() | 传入行序号获取行控件 |


```js
// 获取所有行控件
const allRows = page.getCtrl('表格').row

// 行控件序号
console.log(allRows[1].index) // 1

// 获取 第1行 列名为'产品名称' 的单元格，并对其值清空。
allRows[0].getCtrl('productname').value = ''

// 获取 第2行 列名为'单位' 的单元格，设置其选项值。
allRows[1].getCtrl('unit').options = [
  {
    key: 'cup',
    text: '罐'
  }
]
```

## getColByName()
+ 类型：

```typescript
interface TableColCtrl {
  get title (): string
  set title (value: string): void
  set hidden (value: boolean): void
  set readonly (value: boolean): void
  set required (value: boolean): void
  ...
}

type FunctionGetColByName = (name: string): TableColCtrl | null
```

获取列控件。

取得列控件后，可统一设置该列的 title readonly hidden required 等属性。


```js
// 获取产品列控件
const col = page.getCtrl('表格').getColByName('productname')

// 获取列标题
console.log(col.title)

// 设置列标题
col.title = '产品名称'

// 隐藏列
col.hidden = true

// 设置列只读
col.readonly = true

// 设置列必填
col.required = true
```


## getOperationCtrl()
+ 类型：

```typescript
type FunctionGetOperationCtrl = (name: string): Ctrl | null
```

获取操作按钮控件。

通过传入操作按钮 name 值，获取操作按钮控件，可以对该操作按钮进行 flycode 设置。

```js
// 获取表格中的新增操作按钮并设置隐藏和只读
page.getCtrl('表格').getOperationCtrl('add').hidden = true
page.getCtrl('表格').getOperationCtrl('add').readonly = true
```


## getRowoperationCtrl()
+ 类型：

```typescript
type FunctionGetRowoperationCtrl = (name: string): Ctrl[] | null
```

获取行操作按钮，通过传入行操作按钮 name 值，获取所有行操作按钮控件数组，可以对行操作按钮控件进行 flycode 设置。

```js
// 获取所有行的编辑操作按钮控件
const rowoperation = page.getCtrl('表格').getRowoperationCtrl('edit')
console.log(rowoperation)

// 设置第一行的编辑按钮按钮只读
rowoperation[0].readonly = true
```
