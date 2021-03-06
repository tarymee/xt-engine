import Page from './Page'
import System from './System'
import flycodeVariable from './flycodeVariable'
import axios from 'axios'
export default class Flycode {

  eventManager
  dependenceMap = new Map()

  constructor (eventManager) {
    this.eventManager = eventManager

    // 这里预先收集固定不变的依赖
    // page 应小写 因为是页面实例
    this.dependenceMap.set('page', new Page(this.eventManager))
    this.dependenceMap.set('system', new System(this.eventManager))

    // 每个表单创建一个axios实例 自动添加loading
    const axiosInstance = axios.create()
    axiosInstance.interceptors.request.use(config => {
      this.eventManager.engine.openLoading()
      return config
    }, error => {
      return Promise.reject(error)
    })
    axiosInstance.interceptors.response.use(response => {
      this.eventManager.engine.closeLoading()
      return response
    }, error => {
      this.eventManager.engine.closeLoading()
      return Promise.reject(error)
    })
    this.dependenceMap.set('axios', axiosInstance)

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
    // debugger
    // 收集需要注入的依赖
    const keyArray = []
    const valueArray = []
    this.dependenceMap.forEach((value, key) => {
      keyArray.push(key)
      valueArray.push(value)
    })
    // todo 放到page里面
    keyArray.push('eventTarget')
    valueArray.push(option.eventTarget || null)

    // 用户注册的变量
    // todo 检测用户变量是否系统私有
    for (const x in flycodeVariable) {
      keyArray.push(x)
      valueArray.push(flycodeVariable[x])
    }

    // todo 传入table上下文变量以便做针对table按钮的只读操作

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
