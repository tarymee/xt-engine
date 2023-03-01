/**
 * Ctrl
 * @author tarymee
 * @todo hidden readonly 等属性兼容 0 1 false true
 */
class Ctrl {
  instance

  constructor (instance) {
    this.instance = instance
  }

  // get code () {
  //   return this.getProp('code')
  // }

  // set code (value) {
  //   console.error('code 属性为只读属性，不可设置。')
  // }

  get value () {
    return this.instance.getValue()
  }

  set value (value) {
    this.instance.setValue(value)
  }

  // // 用于获取数值型控件的数字值，便于直接用于计算或比较
  // get floatValue () {
  //   return Number(this.instance.getValue('value'))
  // }

  // set floatValue (value) {
  //   console.error('floatValue 属性为只读属性，不可设置。')
  // }

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

  // get color () {
  //   return this.getProp('color')
  // }

  // set color (value) {
  //   this.setProp('color', value)
  // }

  // // todo: 样式属性遵循js中css的写法 backgroundColor
  // get bgcolor () {
  //   return this.getProp('bgcolor')
  // }

  // set bgcolor (value) {
  //   this.setProp('bgcolor', value)
  // }

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

  setCheck (value, index) {
    this.instance.setCheck(value, index)
  }

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
    return this.instance.getIndex('all')
  }

  get focusedIndex () {
    return this.instance.getIndex('focused')
  }

  get checkedIndex () {
    return this.instance.getIndex('checked')
  }

  get pageable () {
    return this.instance.getProp('pageable')
  }

  set pageable (value) {
    console.error('暂不支持设置 pageable')
  }

  get pageInfo () {
    return this.instance.getPageInfo()
  }

  set pageInfo (pageInfo) {
    return this.instance.setPageInfo(pageInfo)
  }

  deleteInScope (scope = 'all') {
    return this.instance.deleteInScope(scope)
  }

  append (data, type = 'tail') {
    return this.instance.append(data, type)
  }

  update (data = [], index = []) {
    return this.instance.update(data, index)
  }
}

export {
  Ctrl,
  ArrayCtrl
}
