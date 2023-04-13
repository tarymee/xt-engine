import Page from './Page'
import System from './System'
import service from './service'
// import engineMap from '../../components/page/engineMap'
import engineAxiosInstance from '../../service/axios'
// import { cloneDeep } from 'lodash-es'
import axios from 'axios'

export default class Flycode {

  eventManager
  dependenceMap = new Map()

  constructor (eventManager) {
    this.eventManager = eventManager

    // 这里预先收集固定不变的依赖
    // page 应小写 因为是页面实例
    const page = new Page(this.eventManager)
    // page.xxx = 'xxx' // 用户在页面协议注册方法 变量
    this.dependenceMap.set('page', page)
    // this.dependenceMap.set('system', new System(this.eventManager))

    // 每个表单创建一个axios实例 继承引擎与外部注入的拦截器
    const axiosInstance = axios.create()
    // console.log(axios.interceptors)
    // console.log(axiosInstance.interceptors)
    // debugger
    engineAxiosInstance.interceptors.request.handlers.forEach((item) => {
      axiosInstance.interceptors.request.handlers.push(item)
    })
    engineAxiosInstance.interceptors.response.handlers.forEach((item) => {
      axiosInstance.interceptors.response.handlers.push(item)
    })

    // axiosInstance.interceptors.request.use(config => {
    //   // console.log('interceptors', this.eventManager.engine.pagecode)
    //   // debugger
    //   // console.log('interceptors', engineMap)
    //   this.eventManager.engine.openLoading()
    //   return config
    // }, error => {
    //   return Promise.reject(error)
    // })
    // axiosInstance.interceptors.response.use(response => {
    //   this.eventManager.engine.closeLoading()
    //   return response
    // }, error => {
    //   this.eventManager.engine.closeLoading()
    //   return Promise.reject(error)
    // })
    this.dependenceMap.set('axios', axiosInstance)

    // 引擎提供的flycode服务
    // service.axios = axiosInstance
    this.dependenceMap.set('service', service)

    // 用户注册的flycode
    this.dependenceMap.set('inject', Flycode.inject)
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
    keyArray.push('eventTarget')
    valueArray.push(option.eventTarget || null)

    // 是否有使用vue-router 有的话注入到 flycode
    const $router = this.eventManager.engine.$router
    const $route = this.eventManager.engine.$route
    if ($router && $route) {
      keyArray.push('$router')
      valueArray.push($router)
      keyArray.push('$route')
      valueArray.push($route)
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



// 用户注册的flycode 挂到静态对象上 需要时注入
Flycode.inject = {}
// console.log(Flycode.inject)
