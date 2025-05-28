# page

`page` 是 flycode 语法的基本实例类，提供了各种属性，方法以完成页面各种行为功能。

<!-- | 属性/方法 | 说明 |
| ---- | ---- |
| title | 表单页面标题 |
| message() | 消息提示 |
| confirm() | 确认消息 | -->


## title
+ 类型：

```typescript
get title (): string
set title (title: string): void
```

用以获取，设置表单页面标题。

```js
// 获取标题
const title = page.title

// 设置标题
page.title = 'xxx'
```

## message
消息提示，常用于主动操作后的反馈提示。
引用的是 `Element-UI` 的 `Message` 模块，具体 API 请查阅：[https://element.eleme.cn/#/zh-CN/component/message](https://element.eleme.cn/#/zh-CN/component/message)

```js
page.message.success('操作成功！')
page.message.error('操作错误！')
page.message.warning('操作提醒！')
page.message.info('提示信息。')
```

## confirm()
确认消息，提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
引用的是 `Element-UI` 的 `MessageBox.confirm` 模块，具体 API 请查阅：[https://element.eleme.cn/#/zh-CN/component/message-box](https://element.eleme.cn/#/zh-CN/component/message-box)

```js
page.confirm('确定删除？', '提示', {
  type: 'warning',
  closeOnClickModal: false,
  confirmButtonText: '确定',
  cancelButtonText: '取消'
}).then(() => {
  page.message.success('您点击了确认')
}).catch(e => {
  page.message.info('您点击了取消')
})
```

## getValue()/setValue()

+ 类型：

```typescript
type FunctionGetValue = (key: string): any
type FunctionSetValue = (key: string, data: any): void
```

获取/设置内存值。

+ 示例：

```js
// 设置内存值
page.setValue('id', '123456')

// 获取内存值
const id = page.getValue('id')
```

## openPopview()/closePopview()

+ 类型：

```typescript
type FunctionOpenPopview = (name: string): void
type FunctionClosePopview = (name: string): void
```

打开/关闭 popview。

+ 示例：

```js
// 打开/关闭 name = '详情' 的 popview
page.openPopview('详情')
page.closePopview('详情')

// 等价于
page.getCtrl('详情').hidden = false
page.getCtrl('详情').hidden = true
```

## openLoading()/closeLoading()

+ 类型：

```typescript
type FunctionOpenLoading = (): void
type FunctionCloseLoading = (): void
```

打开/关闭 loading 弹窗。

+ 示例：

```js
page.openLoading()
setTimeout(() => {
  page.closePopview()
}, 1000)
```

## runEvent()

+ 类型：

```typescript
type FunctionRunEvent = (name: string): void
```

调用表单事件。

+ 示例：

```js
// 调用 name = '新增' 的事件
page.runEvent('新增')
```

## runEventByCode()

+ 类型：

```typescript
type FunctionRunEventByCode = (code: string): void
```

调用表单事件。

+ 示例：

```js
// 调用 code = 'handle-test' 的事件
page.runEventByCode('handle-test')
```

## triggerEvent()

+ 类型：

```typescript
type FunctionTriggerEvent  = (ctrlName: string, triggerName: string): void
```

触发控件行为事件。

+ 示例：

```js
// 调用 name = '按钮' 的 'onclicked' 事件
page.triggerEvent('按钮', 'onclicked')

// 等于
page.getCtrl('按钮').triggerEvent('onclicked')
```

## validata()

+ 类型：

```typescript
type FunctionValidata = (): void
```

校验整个表单的所有控件，不通过则返回 `false`，并弹出第一个校验不通过控件的提示信息，如果通过则返回 `true`。


+ 示例：

```js
const result = page.validata()
console.log(result)
```

## getCtrl()

+ 类型：

```typescript
interface Ctrl {
  get value (): any
  set value (data: any)

  getValue (): any
  setValue (value: any)

  get hidden (): boolean
  set hidden (flag: boolean)

  get readonly (): boolean
  set readonly (flag: boolean)

  get required (): boolean
  set required (flag: boolean)

  get textual (): boolean
  set textual (flag: boolean)

  get options (): any[]
  set options (data: any[])

  getProp (propName: string): any
  setProp (propName: string, value: any)

  triggerEvent (triggerName: string)

  validata (): boolean
}

type FunctionGetCtrl = (name: string): Ctrl
```

获取控件实例，以调用控件实例方法，对控件进行`取值/赋值/显示/隐藏/设置只读/设置非只读/设置必填/设置非必填/获取数据源/设置数据源/获取控件协议属性/设置控件协议属性`等操作。
当控件为`数组型控件`时，除了支持以上通用方法之外，还额外支持独属于数组型控件的方法。具体请查看`数组型控件 API` 章节。

+ 示例：

```js
// 赋值/取值
page.getCtrl('文本输入框').value = 'test'
const value = page.getCtrl('文本输入框').value

// 显示/隐藏
page.getCtrl('文本输入框').hidden = false
page.getCtrl('文本输入框').hidden = true

// 设置只读/设置非只读
page.getCtrl('文本输入框').readonly = true
page.getCtrl('文本输入框').readonly = false

// 设置必填/设置非必填，仅当控件为输入型控件时支持该方法
page.getCtrl('文本输入框').required = true
page.getCtrl('文本输入框').required = false

// 设置文本模式/设置非文本模式，仅当控件为输入型控件时支持该方法
page.getCtrl('文本输入框').textual = true
page.getCtrl('文本输入框').textual = false

// 设置数据源/获取数据源，仅当控件为数据源类型控件时（如选择器控件，树控件，多选框控件，单选框控件等）支持该方法
page.getCtrl('下拉选择框').options = [
  {
    key: '1',
    text: '启用'
  },
  {
    key: '0',
    text: '停用'
  }
]
const options = page.getCtrl('下拉选择框').options

// 获取控件协议属性/设置控件协议属性，通用属性非通用属性均可
const hidden = page.getCtrl('文本输入框').getProp('hidden')
page.getCtrl('文本输入框').setProp('hidden', true)

const displaytype = page.getCtrl('树控件').getProp('displaytype')
page.getCtrl('树控件').setProp('displaytype', 'navigation')

// 触发控件行为事件
page.getCtrl('按钮').triggerEvent('onclicked')

// 控件校验，不通过则返回 false，并弹出校验不通过控件的提示信息，如果通过则返回 true。
// 当控件为 普通控件/输入型控件 时，执行的是单个控件校验方法
// 当控件为 容器控件/数组型控件 时，依次执行 容器控件/数组型控件 下所包含的所有控件校验方法
page.getCtrl('文本输入框').validata() // 单个控件校验
page.getCtrl('popview').validata() // 校验弹窗控件下的所有控件，新增-保存场景时非常有用
```
