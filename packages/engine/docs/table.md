# table
表格控件

## 示例
暂无

## 协议
```json
{
  "type": "table",
  "title": "表格",
  "name": "表格",
  "checkable": "1",
  "pageable": "1",
  "pagesize": "20",
  "columns": [],
  "operations": [],
  "rowoperations": [],
  "eventlist": []
}
```

### pageable
是否支持分页，默认值为 `0`

| 值 | 说明 |
| ---- | ---- |
| 1 | 支持分页 |
| 0 | 不支持分页 |

### pagesize
如果支持分页，定义每页条数，默认值为 `20`

### checkable
是否支持行勾选，默认值为 `0`

| 值 | 说明 |
| ---- | ---- |
| 1 | 支持行勾选 |
| 0 | 不支持行勾选 |

### columns
定义列，类型为数组，接收控件协议对象。

例子：
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
      "type": "dropdownbox",
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
      ],
      "eventlist": []
    }
  ]
}
```

### operations
定义顶部操作按钮，类型为数组，接受控件协议对象。

按钮控件的 `readonly` 属性可接收专属 table 的关键字。

| 值 | 说明 |
| ---- | ---- |
| tableCheckedNumberIsEqualToZero | 按钮在 table 勾选时可用 |
| tableCheckedNumberIsNotEqualToOne | 按钮在 table 勾选一个时可用 |

例子：
```json
{
  "operations": [
    {
      "text": "新增(按钮一直可用)",
      "readonly": "",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    },
    {
      "text": "删除(按钮一直不可用)",
      "readonly": "1",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    },
    {
      "text": "table 勾选时可用",
      "readonly": "tableCheckedNumberIsEqualToZero",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    },
    {
      "text": "table 勾选一个时可用",
      "readonly": "tableCheckedNumberIsNotEqualToOne",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    }
  ]
}
```


### rowoperations
定义行操作按钮，类型为数组，接受按钮控件协议对象。

例子：
```json
{
  "rowoperations": [
    {
      "text": "编辑",
      "eventlist": [
        {
          "trigger": "onclicked",
          "handler": ""
        }
      ]
    }
  ]
}
```

### eventlist
事件，接受事件协议对象。

| 值 | 说明 |
| ---- | ---- |
| onchecked | table 勾选时触发 |
| onload | table 加载时触发 |

```json
{
  "eventlist": [
    {
      "trigger": "onchecked",
      "handler": ""
    },
    {
      "trigger": "onload",
      "handler": ""
    }
  ]
}
```





## flycode


| flycode | 说明 |
| ---- | ---- |
| value | 取值赋值 |
| focusedValue | 获取焦点行值 |
| checkedValue | 获取勾选行值 |
| index | 获取所有行序号 |
| focusedIndex | 获取焦点行序号 |
| checkedIndex | 获取勾选行序号 |
| pageable | 获取是否设置分页 |
| pageInfo | 获取/设置分页 |
| setCheck() | 设置行勾选状态 |
| deleteInScope() | 删除特定行 |
| append() | 插入行数据 |
| update() | 更新行数据 |
| row | 获取所有行控件 |
| focusedRow | 获取焦点行控件 |
| checkedRow | 获取勾选行控件 |
| getRow() | 传入行序号获取行控件 |
| getColByName() | 传入列名获取列控件 暂未实现 |


### value
对 table 控件进行取值、赋值。

类型定义：
```typescript
interface RowValue {
  [propName: string]: any
}

get value (): RowValue[]

set value (data: RowValue[]): void
```

例子：
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


### focusedValue checkedValue
获取控件特定值。

| 值 | 说明 |
| ---- | ---- |
| focusedValue | 获取焦点行的值 |
| checkedValue | 获取勾选行的值 |

类型定义：
```typescript
interface RowValue {
  [propName: string]: any
}

get focusedValue (): RowValue | null

get checkedValue (): RowValue[]
```

例子：
```js
// 当点击某一行时触发事件 获取焦点行的值
const focusedValue = page.getCtrl('表格').focusedValue
console.log(focusedValue)

// 获取勾选行的值
const checkedValue = page.getCtrl('表格').checkedValue
console.log(checkedValue)
```

### index focusedIndex checkedIndex
获取控件行序号。

| 值 | 说明 |
| ---- | ---- |
| index | 获取所有行序号 |
| focusedIndex | 获取焦点行序号 |
| checkedIndex | 获取勾选行序号 |

类型定义：
```typescript
get index (): number[]

get focusedIndex (): number | null

get checkedIndex (): number[]
```

例子：
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

### pageable
获取是否设置分页。

类型定义：
```typescript
get pageable (): boolean
```

例子：
```js
const pageable = page.getCtrl('表格').pageable
console.log(pageable)
```

### pageInfo
在 table 定义支持分页的情况下，获取/设置分页信息。

类型定义：
```typescript
interface PageInfo {
  __itemcount: number | string;
  __pageindex: number | string;
  __pagesize: number | string;
}

get pageInfo (): PageInfo
set pageInfo (pageInfo: PageInfo): void
```

例子：
```js
// 获取当前分页信息
const pageInfo = page.getCtrl('表格').pageInfo
console.log(pageInfo)

// 设置当前分页信息
page.getCtrl('表格').pageInfo = {
  __itemcount: 100,
  __pageindex: 1;
  __pagesize: 20;
}
```

### setCheck()
设置行勾选状态。

类型定义：
```typescript
type setCheck = (value: boolean, index: number): void
```

例子：
```js
// 设置第一行为勾选状态
page.getCtrl('表格').setCheck(true, 0)
```


### deleteInScope()
删除特定行。

类型定义：
```typescript
type deleteInScope = (scope: 'all' | 'focused' | 'checked'): void
```

例子：
```js
// 删除所有行
page.getCtrl('表格').deleteInScope('all')

// 删除焦点行
page.getCtrl('表格').deleteInScope('focused')

// 删除勾选行
page.getCtrl('表格').deleteInScope('checked')
```


### append()
插入行数据。

类型定义：
```typescript
interface RowValue {
  [propName: string]: any
}

type append = (data: RowValue | RowValue[], type: 'head' | 'tail'): void
```

| type值 | 说明 |
| ---- | ---- |
| head | 从行头插入数据 |
| tail | 从行尾插入数据 |

例子：
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



### update()
更新行数据。

类型定义：
```typescript
interface RowValue {
  [propName: string]: any
}

type update = (data: RowValue | RowValue[], index: number | number[]): void
```

例子：
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


### row focusedRow checkedRow getRow()
获取行控件。

取得行控件后，可通过 getCtrl() 方法获取该行下某一单元格的控件实例，从而对单元格控件进行 flycode 操作。

| 值 | 说明 |
| ---- | ---- |
| row | 获取所有行控件 |
| focusedRow | 获取焦点行控件 |
| checkedRow | 获取勾选行控件 |
| getRow() | 传入行序号获取行控件 |

类型定义：
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

interface Row {
  index: number;
  getCtrl(name: string): Ctrl;
}

get row (): Row[]

get focusedRow (): Row | null

get checkedRow (): Row[]

type getRow = (index: number | number[]): Row | Row[] | null
```

例子：
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
