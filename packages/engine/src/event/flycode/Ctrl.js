class Ctrl {
  instance

  constructor (instance) {
    this.instance = instance
  }

  // get code () {
  //   return this.getProp('code')
  // }

  // set code (value) {
  //   console.error('code 属性为只读属性，不可设置')
  // }

  get value () {
    return this.instance.getValue()
  }

  set value (value) {
    this.instance.setValue(value)
  }

  get hidden () {
    return this.getProp('hidden')
  }

  set hidden (value) {
    this.setProp('hidden', value)
  }

  get readonly () {
    return this.getProp('readonly')
  }

  set readonly (value) {
    this.setProp('readonly', value)
  }

  get required () {
    return this.getProp('required')
  }

  set required (value) {
    this.setProp('required', value)
  }

  get options () {
    return this.getProp('options')
  }

  set options (value) {
    this.setProp('options', value)
  }

  getProp (propName, getter) {
    return this.instance.getProp(propName, getter)
  }

  setProp (propName, value, setter) {
    this.instance.setProp(propName, value, setter)
  }

  getValue (getter) {
    return this.instance.getValue(getter)
  }

  setValue (value, setter) {
    this.instance.setValue(value, setter)
  }

  // 触发控件事件
  triggerEvent (triggerName) {
    this.instance.executeEvent(triggerName)
  }

  // 控件校验
  validata () {
    return this.instance.validata()
  }

}

class ArrayCtrl extends Ctrl {

  get focusedValue () {
    return this.instance.getValue({
      datatype: '0',
      ctrl: {
        code: this.instance.code,
        scope: 'focused'
      }
    })
  }

  get checkedValue () {
    return this.instance.getValue({
      datatype: '1',
      ctrl: {
        code: this.instance.code,
        scope: 'checked'
      }
    })
  }

  get index () {
    if (!this.instance.getIndex) throw Error('暂不支持该方法')
    return this.instance.getIndex('all')
  }

  get focusedIndex () {
    if (!this.instance.getIndex) throw Error('暂不支持该方法')
    return this.instance.getIndex('focused')
  }

  get checkedIndex () {
    if (!this.instance.getIndex) throw Error('暂不支持该方法')
    return this.instance.getIndex('checked')
  }

  get pageable () {
    return this.instance.getProp('pageable')
  }

  set pageable (value) {
    console.error('暂不支持设置 pageable')
  }

  get pageInfo () {
    if (!this.instance.getPageInfo) throw Error('暂不支持该方法')
    return this.instance.getPageInfo()
  }

  set pageInfo (pageInfo) {
    if (!this.pageable) throw Error('pageable = false 不支持设置分页')
    if (!this.instance.setPageInfo) throw Error('暂不支持该方法')
    return this.instance.setPageInfo(pageInfo)
  }

  deleteInScope (scope = 'all') {
    if (!this.instance.deleteInScope) throw Error('暂不支持该方法')
    return this.instance.deleteInScope(scope)
  }

  append (data, type = 'tail') {
    if (!this.instance.append) throw Error('暂不支持该方法')
    if (Array.isArray(data)) {
      this.instance.append(data, type)
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
      this.instance.append([data], type)
    } else {
      console.error('传入 data 类型错误')
    }
  }

  update (data = [], index = []) {
    if (!this.instance.update) throw Error('暂不支持该方法')
    if (Array.isArray(data) && Array.isArray(index)) {
      this.instance.update(data, index)
    } else if (Object.prototype.toString.call(data) === '[object Object]' && typeof index === 'number') {
      this.instance.update([data], [index])
    } else {
      console.error('传入 data index 类型错误')
    }
  }

  // 行控件
  get row () {
    const index = this.index
    return this.getRowByIndex(index)
  }

  get focusedRow () {
    const focusedIndex = this.focusedIndex
    return focusedIndex === null ? null : this.getRowByIndex(focusedIndex)
  }

  get checkedRow () {
    const checkedIndex = this.checkedIndex
    return this.getRowByIndex(checkedIndex)
  }

  getRowByIndex (index) {
    if (!this.instance.getRowsCtrlMap) throw Error('暂不支持该方法')
    if (Array.isArray(index)) {
      const maps = this.instance.getRowsCtrlMap(index)
      // console.log(maps)
      return maps.map((itemCtrlMap, i) => {
        return new ArrayRowCtrl(itemCtrlMap, index[i])
      })
    } else if (typeof index === 'number') {
      const map = this.instance.getRowsCtrlMap([index])[0]
      return map ? new ArrayRowCtrl(map, index) : null
    } else {
      console.error('传入 index 类型错误')
      return null
    }
  }

  getColByName (name) {
    const curCol = this.instance.columns.find((item) => item.name === name)
    return curCol ? new TableColCtrl(this.instance, name) : null
  }

  getOperationCtrl (name) {
    if (!name) {
      console.error(`请传入操作按钮 name 值`)
      return null
    }
    if (!this.instance.getOperationCtrl) throw Error('暂不支持该方法')
    const operationInstance = this.instance.getOperationCtrl(name)
    if (!operationInstance) {
      console.error(`找不到 name 为【${name}】的操作按钮控件实例，请检查`)
      return null
    }
    return new Ctrl(operationInstance)
  }

  getRowoperationCtrl (name) {
    if (!name) {
      console.error(`请传入行操作按钮 name 值`)
      return null
    }
    if (!this.instance.getRowoperationCtrl) throw Error('暂不支持该方法')
    const rowoperationInstance = this.instance.getRowoperationCtrl(name)
    if (!rowoperationInstance) {
      console.error(`找不到 operation name 为【${name}】的控件实例，请检查`)
      return null
    }
    return new Ctrl(rowoperationInstance)
  }

  setCheck (value, index) {
    if (!this.instance.setCheck) throw Error('暂不支持该方法')
    this.instance.setCheck(value, index)
  }
}
class ArrayRowCtrl {
  instanceMap
  index

  constructor (instanceMap, index) {
    this.instanceMap = instanceMap
    this.index = index
  }

  get index () {
    return this.index
  }

  getCtrl (name) {
    const tipPrefix = '[Page.getCtrl()]'
    if (!name) {
      console.error(`${tipPrefix} 请传入控件 name 值`)
      return
    }
    const instance = this.instanceMap[name]
    if (!instance) {
      console.error(`${tipPrefix} 找不到 name 为【${name}】的控件实例，请检查`)
      return
    }
    return new Ctrl(instance)
  }
}
class TableColCtrl {
  instance
  name

  constructor (instance, name) {
    this.instance = instance
    this.name = name
  }

  get title () {
    return this.instance.getColTitle(this.name)
  }

  set title (title) {
    this.instance.setColTitle(this.name, title)
  }

  set readonly (value) {
    this.instance.setColReadonly(this.name, value)
  }

  set required (value) {
    this.instance.setColRequired(this.name, value)
  }

  set hidden (value) {
    this.instance.setColHidden(this.name, value)
  }

}

export {
  Ctrl,
  ArrayCtrl
}
