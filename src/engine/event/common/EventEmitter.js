/**
 * 事件分发器 - 观察者
 * @author tarymee
 */
class EventEmitter {

  _events = new Map()

  on (type, listener) {
    let eventListener = this._events.get(type)
    if (eventListener === undefined) {
      eventListener = new Set()
      this._events.set(type, eventListener)
    }
    eventListener.add(listener)
    return this
  }

  emit (type, data) {
    const eventListener = this._events.get(type)
    if (eventListener && eventListener.size) {
      eventListener.forEach(listener => {
        listener.call(this, data)
      })
    }
    return this
  }

  off (type, listener) {
    const eventListener = this._events.get(type)
    if (eventListener && eventListener.size) {
      // 如果有 listener 那么只清除该 listener
      if (listener) {
        eventListener.delete(listener)
        if (!eventListener.size) {
          this._events.delete(type)
        }
      } else {
        // 如果没有 listener 那么清除所有
        this._events.delete(type)
      }
    }
    return this
  }

  offAll () {
    this._events.clear()
    return this
  }
}

const eventEmitter = new EventEmitter()

export {
  EventEmitter,
  eventEmitter
}
