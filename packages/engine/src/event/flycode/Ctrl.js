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
    return this.getRow(index)
  }

  get focusedRow () {
    const focusedIndex = this.focusedIndex
    return focusedIndex === null ? null : this.getRow(focusedIndex)
  }

  get checkedRow () {
    const checkedIndex = this.checkedIndex
    return this.getRow(checkedIndex)
  }

  getRow (index) {
    if (!this.instance.getRowsCtrlMap) throw Error('暂不支持该方法')
    if (Array.isArray(index)) {
      const maps = this.instance.getRowsCtrlMap(index)
      // console.log(maps)
      return maps.map((item, i) => {
        return new Row(item, index[i])
      })
    } else if (typeof index === 'number') {
      const map = this.instance.getRowsCtrlMap([index])[0]
      return map ? new Row(map, index) : null
    } else {
      console.error('传入 index 类型错误')
      return null
    }
  }

  setCheck (value, index) {
    if (!this.instance.setCheck) throw Error('暂不支持该方法')
    this.instance.setCheck(value, index)
  }
}


class Row {
  rowsCtrlMap
  index

  constructor (rowsCtrlMap, index) {
    this.rowsCtrlMap = rowsCtrlMap
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
    const instance = this.rowsCtrlMap[name]
    if (!instance) {
      console.error(`${tipPrefix} 找不到 name 为【${name}】的控件实例，请检查`)
      return
    }
    return new Ctrl(instance)
  }

}

export {
  Ctrl,
  ArrayCtrl
}
