
import { get } from 'lodash-es'

export default class BaseAction {
  actionJson
  eventManager
  option
  eventTarget
  tipPrefix // 提示前缀

  constructor (actionJson, option, eventManager) {
    this.actionJson = actionJson
    this.eventManager = eventManager
    this.option = option
    this.eventTarget = option && option.eventTarget
    this.tipPrefix = `[action] ${this.actionJson.type} 【${this.actionJson.code}】`
  }

  // TODO: 有用的属性必须接入 flycode
  dealCondition (condition) {
    // let canGo = LogicExpression.run(condition, context)
    // // condition判断action是否执行，返回resolve继续执行下面的action，而不是中断action队列
    // if (!canGo) return Promise.resolve()
    return !condition
  }

  /**
   * @desc 创建函数
   * @author tarymee
   * @return {any | void} return
   * @example
   */
  createActionFn () {
    return async () => {
      // 判断Condiction
      if (!this.dealCondition(this.actionJson.condition)) {
        return Promise.resolve()
      }
      // console.log(`${this.tipPrefix} start`)
      const result = await this.action()
      // console.log(`${this.tipPrefix} end`)
      return result
    }
  }

  /**
  * 处理 getter 取值逻辑
  * @author tarymee
  * @param getterRule 取值规则
  */
  getter (getterRule) {
    const ctrlCodeMap = this.eventManager.ctrlCodeMap
    const memoryPool = this.eventManager.memoryPool

    const result = {}

    getterRule.forEach((getter, i) => {
      const datatype = get(getter, 'datatype', '0')
      const name = get(getter, 'name', '__$noname')
      const ctrlCode = get(getter, 'ctrl.code')
      const properties = get(getter, 'properties', [])
      if (datatype === '0') {
        // datatype 为对象类型
        result[name] = {}
        if (ctrlCode) {
          const instance = ctrlCodeMap.get(ctrlCode)
          if (instance) {
            const ret = instance.getView('value', getter)
            if (Array.isArray(ret) && ret.length > 0) {
              // 如果 getView 结果是数组 则返回数组的第一个元素
              result[name] = ret[0]
            } else {
              result[name] = ret
            }
          } else {
            console.error(`[getter] 【${name}】对控件【${ctrlCode}】取值失败，找不到【${ctrlCode}】控件实例。`)
          }
        } else {
          properties.forEach((getterProp) => {
            // 取值优先级
            // 1 事件传参 ? 暂不支持
            // 2 控件
            // 3 内存取值
            // 4 默认值
            const propName = get(getterProp, 'name')
            const propCtrlCode = get(getterProp, 'ctrl.code')
            const propValue = get(getterProp, 'value')
            if (propName) {
              if (propCtrlCode) {
                // 控件取值
                const propInstance = ctrlCodeMap.get(propCtrlCode)
                if (propInstance) {
                  const propCtrlComponent = get(getterProp, 'ctrl.component', 'value')
                  result[name][propName] = propInstance.getView(propCtrlComponent, getterProp)
                } else {
                  console.error(`[getter] 【${name}.${propName}】对控件【${propCtrlCode}】取值失败，找不到【${ctrlCode}】控件实例。`)
                }
              } else {
                if (memoryPool.get(propName)) {
                  // 内存取值
                  result[name][propName] = memoryPool.get(propName)
                } else if (propValue) {
                  // 默认值
                  // TODO: 加入 flycode 支持
                  result[name][propName] = propValue
                }
                // 所有取值方式依然取不到值 则默认传''
                if (result[name][propName] === undefined) {
                  result[name][propName] = ''
                }
              }
            }
          })
        }
      } else if (datatype === '1') {
        // datatype为数组类型
        result[name] = []
        if (ctrlCode) {
          const instance = ctrlCodeMap.get(ctrlCode)
          if (instance) {
            const ret = instance.getView('value', getter)
            if (Array.isArray(ret)) {
              result[name] = ret
            } else {
              result[name] = [ret]
            }
          } else {
            console.error(`[getter] 【${name}】对控件【${ctrlCode}】取值失败，找不到【${ctrlCode}】控件实例。`)
          }
        } else {
          // 目标没有配置ctrl，暂无此场景 - 例如批量编辑
        }
      }
    })

    return result
  }

  /**
   * 处理 setter 赋值逻辑
   * @author tarymee
   * @param setterRule 赋值规则
   * @param dataSource 赋值数据
   * @example
   */
  setter (setterRule, dataSource) {
    if (!dataSource) {
      console.error('[setter] 找不到【setter】数据')
      return false
    }
    const ctrlCodeMap = this.eventManager.ctrlCodeMap
    const memoryPool = this.eventManager.memoryPool
    setterRule.forEach((setter, i) => {
      const datatype = get(setter, 'datatype', '0')
      const name = get(setter, 'name', '__$noname')
      // setter 的 ctrlCode 结构改成跟 getter 一样
      // const ctrlCode = get(setter, 'ctrlcode')
      const ctrlCode = get(setter, 'ctrl.code')
      const properties = get(setter, 'properties', [])
      const setterDate = dataSource[name]
      if (!setterDate) {
        console.error(`[setter] 找不到【${name}】数据。`)
        return false
      }
      if (datatype === '0') {
        if (typeof setterDate !== 'object') {
          console.error(`[setter] 数据类型错误，【${name}】定义的数据类型为对象但实际输出为非对象格式，请检查。`)
          return false
        }
        if (ctrlCode) {
          const instance = ctrlCodeMap.get(ctrlCode)
          if (instance) {
            instance.setView(setterDate, 'value', setter)
          } else {
            console.error(`[setter] 【${name}】对控件【${ctrlCode}】赋值失败，找不到【${ctrlCode}】控件实例。`)
          }
        } else {
          // 目标不存在ctrlcode配置 遍历property赋值
          properties.forEach((setterProp) => {
            const propName = get(setterProp, 'name')
            const propAlias = get(setterProp, 'alias')
            const propCtrlCode = get(setterProp, 'ctrl.code')
            if (propName) {
              if (propCtrlCode) {
                // 控件赋值
                const propInstance = ctrlCodeMap.get(propCtrlCode)
                if (propInstance && setterDate[propName] !== undefined) {
                  const propCtrlComponent = get(setterProp, 'ctrl.component', 'value')
                  propInstance.setView(setterDate[propName], propCtrlComponent, setterProp)
                } else {
                  console.error(`[setter] 【${name}.${propName}】对控件【${propCtrlCode}】赋值失败，找不到【${propCtrlCode}】控件实例。`)
                }
              } else {
                // 如果没有控件赋值 则把值加入内存池
                const nameMemory = memoryPool.get(name) || {}
                if (setterDate[propName] !== undefined) {
                  nameMemory[propName] = setterDate[propName]
                  // 内存中记录属性别名alias
                  if (propAlias) {
                    nameMemory[propAlias] = setterDate[propName]
                  }
                }
                memoryPool.set(name, nameMemory)
              }
            }
          })
        }
      } else if (datatype === '1') {
        Array.isArray(setterDate)
        if (!Array.isArray(setterDate)) {
          console.error(`[setter] 数据类型错误，【${name}】定义的数据类型为数组但实际输出为非数组格式，请检查。`)
          return false
        }
        if (ctrlCode) {
          const instance = ctrlCodeMap.get(ctrlCode)
          if (instance) {
            instance.setView(dataSource, 'value', setter)
          } else {
            console.error(`[setter] 【${name}】对控件【${ctrlCode}】赋值失败，找不到【${ctrlCode}】控件实例。`)
          }
        } else {
          // 没有配置 ctrlcode 把整个数据拷贝在内存 - 一般用在call action回写的情况
          memoryPool.set(name, dataSource[name])
        }
      }
    })
  }

}
