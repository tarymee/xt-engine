import Page from './Page'
import System from './System'

export default class Flycode {

  eventManager
  dependenceMap = new Map()

  constructor (eventManager) {
    this.eventManager = eventManager

    // 这里预先收集固定不变的依赖
    this.dependenceMap.set('Page', new Page(this.eventManager))
    this.dependenceMap.set('System', new System(this.eventManager))
    this.dependenceMap.set('day', function (number) {
      return number
    })
  }

  run (value = '', option = {}) {
    if (value === false || value === 'false') {
      return false
    }
    if (value === true || value === 'true') {
      return true
    }
    if (!value) {
      return value
    }
    if (value) {
      if (typeof value === 'string') {
        value = value.trim()
        if (value.indexOf('fly:') >= 0) {
          // 例子：value: 'fly:let yearValue = System.year(1);Ctrl.setProperty(xxx);'
          value = value.replace(/^\s*fly:/ig, '')
          return this.runFlycode(value, option)
        } else if (value.indexOf('le:') >= 0) {
          // 例子：value: 'le:{status} > 0'
          value = value.replace('le:', '')
          return this.runLogicExpression(value, option)
        }
      }
      // 1、value为boolean类型
      // 2、value为string类型但不满足上述indexOf条件
      // 例子：value: '1'
      return value
    }
  }

  runFlycode (script, option = {}) {
    // 收集需要注入的依赖
    const keyArray = []
    const valueArray = []
    this.dependenceMap.forEach((value, key) => {
      keyArray.push(key)
      valueArray.push(value)
    })
    // todo 放到Page里面
    keyArray.push('eventTarget')
    valueArray.push(option.eventTarget || null)

    const fn = new Function(
      // 依赖注入
      ...keyArray,
      `
        return (function(){
          return {
            _execFlycode: function(script) {
              script = 'var _execFlycode = function(){\\n\\n\\n'+ script + '\\n\\n\\n}\\n_execFlycode()'
              var result = eval(script)
              return result
            }
          }
        })()
      `
    )(...valueArray)

    let flycodeResult = null
    try {
      flycodeResult = fn._execFlycode(script)
    } catch (e) {
      console.error('[flycode] 执行出错，错误信息如下：')
      console.error(e)
      console.error(script)
      return e
    }
    return flycodeResult
  }

  runLogicExpression (expression, option = {}) {
    return expression
  }
}

// const flycode = new Flycode()
