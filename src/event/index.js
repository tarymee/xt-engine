import MemoryPool from './common/MemoryPool'
import ParallelLimit from './common/ParallelLimit'
import actionMap from './actions/common'
import Flycode from './flycode'
import { eventEmitter } from './common/EventEmitter'
import { get } from 'lodash-es'

export default class EventManager {
  constructor (option) {
    this.engine = option.engine
    this.ctrlNameCodeMap = option.engine.ctrlNameCodeMap
    this.ctrlCodeMap = option.engine.ctrlCodeMap
    this.protocolFormat = option.engine.protocolFormat
    this.pagecode = option.engine.pagecode
    this.register()
  }

  pagecode = null
  engine = null
  protocolFormat = null

  // 控件映射表
  ctrlNameCodeMap = null
  ctrlCodeMap = null

  // 内存池
  memoryPool = new MemoryPool()

  // 事件映射表 code => event
  initialEventMap = new Map()
  interfaceEventMap = new Map()
  handlersEventMap = new Map()
  eventMap = new Map()
  eventNameCodeMap = new Map()

  // 注册事件 接口 等
  register () {
    const presenter = get(this.protocolFormat, 'presenter', {
      initial: [],
      interface: [],
      handlers: []
    })
    const initialEvent = presenter.initial
    const interfaceEvent = presenter.interface
    const handlersEvent = presenter.handlers
    initialEvent.forEach((item, i) => {
      this.initialEventMap.set(item.code, item)
    })
    interfaceEvent.forEach((item, i) => {
      this.interfaceEventMap.set(item.code, item)
    })
    handlersEvent.forEach((item, i) => {
      this.handlersEventMap.set(item.code, item)
    })
    const allEvent = [...initialEvent, ...interfaceEvent, ...handlersEvent]
    // console.log(allEvent)
    allEvent.forEach((item, i) => {
      if (!item.code) {
        console.error(`事件【${JSON.stringify(item)}】的 code 不得为空, 请修改。`)
      }
      if (this.eventMap.get(item.code)) {
        console.error(`code为【${item.code}】的事件重复, 请修改。`)
      }
      this.eventMap.set(item.code, item)

      if (item.name) {
        if (this.eventNameCodeMap.get(item.name)) {
          console.error(`name为【${item.name}】的事件重复, 请修改。`)
        }
        this.eventNameCodeMap.set(item.name, item.code)
      }
    })

  }

  /**
   * flycode实例
   * @author tarymee
   */
  flycode = new Flycode(this)
  runFlycode (value, option = {}) {
    // if (value === 'fly: console.warn(eventTarget);return false') {
    //   console.log(value)
    //   console.log(option)
    //   debugger
    // }
    // console.log(this.flycode)
    // debugger
    return this.flycode.run(value, option)
  }

  // 重置事件管理器 回到初始状态
  reset () {
    // console.log(`[eventManager] 【${this.pagecode}】 reset`)
    this.isInit = false
    this.isRunInitialEvent = false
    this.waitEventQueue = []
    this.memoryPool.clear()

    // 销毁页面监听事件
    this.interfaceEventFunctionMap.forEach((value, key) => {
        eventEmitter.off(key, value)
    })
    this.interfaceEventFunctionMap.clear()
  }

  /**
   * @desc 组装事件队列
   * @author tarymee
   */
  createActionQueue (eventjson, option = {}) {
    const actionsjson = get(eventjson, 'actions', [])
    const actionQueue = actionsjson.map((json) => {
      const ActionController = (actionMap)[json.type] ? (actionMap)[json.type] : (actionMap).default
      return new ActionController(json, option, this).createActionFn()
    })
    return actionQueue
  }

  /**
   * action 行为执行器 串行执行 按顺序同步执行事件队列
   * @author tarymee
   * @param actionQueue 要执行的事件队列
   * @param option 回调参数
   */
  async actionActuator (actionQueue = [], option) {
    const result = []
    try {
      while (actionQueue.length > 0) {
        const action = actionQueue.shift()
        if (!action) continue
        const res = await action()
        result.push(res)
      }
      option && option.success && option.success(result)
      return result
    } catch (err) {
      // console.log(result)
      // console.error(err)
      option && option.error && option.error(err, result)
      throw Error(err)
    }
  }

  // 初始化事件未执行完 则把事件推入栈 等待执行
  waitEventQueue = []

  // event 事件执行器 并行执行(支持限制个数)
  eventActuator = new ParallelLimit(2)


  /**
   * 执行事件 如果初始化事件未执行完 则把事件推入栈 等待初始化事件执行完毕之后再执行
   * @author tarymee
   * @param eventCode 事件eventCode
   * @param option 回调参数
   */
  runEventByCode (eventCode, option = {}) {
    const event = this.eventMap.get(eventCode)
    if (!event) {
      console.error(`找不到 code 为【${eventCode}】的事件，请检查。`)
      return
    }
    // console.log(eventCode)
    // debugger
    if (!this.isRunInitialEvent) {
      this.waitEventQueue.push({
        code: eventCode,
        option: option
      })
    } else {
      const actionQueue = this.createActionQueue(event, option)
      this.eventActuator.runTask(this.actionActuator, actionQueue, option)
    }
  }

  // 是否执行完初始化事件 保证其他事件必须在初始化事件执行完毕之后再执行
  isRunInitialEvent = false

  // 执行初始化事件
  runInitialEvent () {
    // debugger
    // console.log('runInitialEvent')
    const done = () => {
      // console.log(`[eventManager] 【${this.pagecode}】 init done`)
      this.isRunInitialEvent = true
      while (this.waitEventQueue.length > 0) {
        const waitEvent = this.waitEventQueue.shift()
        waitEvent && this.runEventByCode(waitEvent.code, waitEvent.option)
      }
    }
    if (this.initialEventMap.size > 0) {
      for (const key of this.initialEventMap.keys()) {
        const actionQueue = this.createActionQueue(this.eventMap.get(key))
        this.actionActuator(actionQueue).finally(() => {
          done()
        })
      }
    } else {
      done()
    }
  }

  // 储存页面监听事件 届时销毁
  interfaceEventFunctionMap = new Map()

  /**
   * 监听事件
   * @author tarymee
   */
  runInterfaceEvent () {
    // console.log('runInterfaceEvent')
    this.interfaceEventMap.forEach((value, key) => {
      const fn = (data) => {
        // TODO 找不到this时 销毁页面监听事件
        if (data.__eventlink) {
          this.memoryPool.set('__eventlink', data.__eventlink)
        }
        if (data.pagecode === this.pagecode) {
          this.runEventByCode(key)
        }
      }
      this.interfaceEventFunctionMap.set(value.key, fn)
      eventEmitter.on(value.key, fn)
    })
  }

  // 是否初始化过 防止重复初始化
  isInit = false

  init () {
    if (!this.isInit) {
      this.isInit = true
      // console.log(`[eventManager] 【${this.pagecode}】 init`)
      this.runInitialEvent()
      this.runInterfaceEvent()
    }
  }
}
