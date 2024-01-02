import { eventEmitter } from '../common/EventEmitter'
import { Ctrl, ArrayCtrl } from './Ctrl'
import { Message, MessageBox } from 'element-ui'
import loading from '../../service/loading'

export default class Page {
  eventManager

  constructor (eventManager) {
    this.eventManager = eventManager
    // debugger
  }

  get engine () {
    return this.eventManager.engine
  }

  get message () {
    return Message
  }

  get confirm () {
    return MessageBox.confirm
  }

  // get IN () {
  //   return this.eventManager.memoryPool.get('IN')
  // }
  // static IN = this.eventManager.memoryPool.get('IN')

  get title () {
    return this.eventManager.engine.title
  }

  set title (title) {
    this.eventManager.engine.title = title
  }

  // // 获取表单传参
  // getLinkParams () {
  //   return this.eventManager.memoryPool.get('__linkparam')
  // }

  // 获取页面内存值
  getValue (key) {
    if (!key) return null
    const result = this.eventManager.memoryPool.get(key)
    if (result !== undefined) {
      return result
    } else {
      return null
      // const __linkparam = this.getLinkParams()
      // return __linkparam && __linkparam[key]
    }
  }

  // 设置页面内存值
  setValue (key, value) {
    if (!key) return null
    this.eventManager.memoryPool.set(key, value)
    // TODO: 基于 __pagestatus 刷新页面状态
    if (key === '__pagestatus') {
      // 刷新页面状态
    }
  }

  /**
   * 批量获取页面内存值
   * @author tarymee
   * @param params ['key1', 'key2']
   * @return { key: value } 字典类型
   */
  getValues (params) {
    if (Array.isArray(params)) {
      const getValuesResult = {}
      for (const param of params) {
        getValuesResult[param] = this.getValue(param)
      }
      return getValuesResult
    } else {
      return null
    }
  }

  /**
   * 批量设置页面内存值
   * @author tarymee
   * @param params { key1: value1, key2: value2 }
   */
  setValues (params) {
    if (typeof params === 'object') {
      for (const x in params) {
        this.setValue(x, params[x])
      }
    }
  }

  getCtrl (name) {
    const tipPrefix = '[Page.getCtrl()]'
    if (!name) {
      console.error(`${tipPrefix} 请传入控件 name 值。`)
      return
    }
    const ctrlCode = this.eventManager.ctrlNameCodeMap.get(name)
    if (!ctrlCode) {
      console.error(`${tipPrefix} 找不到 name 为【${name}】的控件实例，请检查。`)
      return
    }
    const instance = this.eventManager.ctrlCodeMap.get(ctrlCode)
    if (!instance) {
      console.error(`${tipPrefix} 找不到 name 为【${name}】的控件实例，请检查。`)
      return
    }
    if (instance.isArrayCtrl) {
      return new ArrayCtrl(instance)
    } else {
      return new Ctrl(instance)
    }
  }

  // 表单事件调用
  callEvent (eventKey, params) {
    eventEmitter.emit(eventKey, {
      pagecode: '',
      __eventlink: params
    })
  }

  // 表单事件调用
  runEvent (eventName, option) {
    const tipPrefix = '[Page.runEvent(eventName, option)]'
    if (!eventName) {
      console.error(`${tipPrefix} 请传入调用事件的 name 值。`)
      return
    }
    const eventCode = this.eventManager.eventNameCodeMap.get(eventName)
    if (!eventCode) {
      console.error(`${tipPrefix} 找不到 name 为【${eventName}】的事件，请检查。`)
      return
    }
    this.eventManager.runEvent(eventCode, option)
  }

  // 检查表单合法性
  // constraintCheck () {}

  // 控件校验
  validata () {
    let res = true
    for (var [key, item] of this.eventManager.ctrlCodeMap) {
      if (!item.isContainerCtrl) {
        res = item.validata()
      }
      if (!res) {
        break
      }
    }
    return res
  }

  openPopview (name) {
    this.getCtrl(name).hidden = false
  }

  closePopview (name) {
    this.getCtrl(name).hidden = true
  }

  // 打开 loading 弹窗
  openLoading () {
    loading.open()
  }
  // 关闭 loading 弹窗
  closeLoading () {
    loading.close()
  }

  // 为 page 提供函数
  // provide (name, value) {
  //   this[name] = value
  // }

  // 设置表单数据加载状态
  // setLoadStatus() {}

  // 弹出对话框
  // alert() {}

  // // 链接到指定表单（code）
  // link(pagecode, params, mode, size, title) {
  //     const tipPrefix = '[Page.link()]'
  //     if (!pagecode) {
  //         console.error(`${tipPrefix} pagecode 为空，无法跳转页面。`)
  //         return
  //     }
  //     const query = {}
  //     if (params) {
  //         if (typeof params === 'object') {
  //             query.__linkparam = JSON.stringify(params)
  //         } else {
  //             console.error(`${tipPrefix}传参 params 仅接受对象格式，请修改。`)
  //             return
  //         }
  //     }
  //     if (title) {
  //         query.__linktitle = title
  //     }
  //     routerManager.push(pagecode, mode, params)
  // }

  // // 返回表单
  // return(count = 1) {
  //     routerManager.back(0 - Number(count))
  // }

  // 针对表单控件赋值
  // updateSerialized(serializedValue, setter) {}

  // // 页面属性
  // getProperty() {}
  // getProperties() {}
  // setProperty() {}
  // setProperties() {}
}
