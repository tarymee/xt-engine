import { cloneDeep } from 'lodash-es'

/**
 * @desc 内存池管理器 取值赋值均需深复制 以免内外互相影响
 * @author tarymee
 */
export default class MemoryPool {

  memory = new Map()

  get (name) {
    return cloneDeep(this.memory.get(name))
  }

  set (name, data) {
    this.memory.set(name, cloneDeep(data))
  }

  clear () {
    this.memory.clear()
  }
}
