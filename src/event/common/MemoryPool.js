import { cloneDeep } from 'lodash-es'

/**
 * @desc 内存池管理器 取值赋值均需深复制 以免内外互相影响
 * @author tarymee
 */
export default class MemoryPool {

  memory = new Map()

  get (name) {
    const data = this.memory.get(name)
    if (typeof data === 'function') {
      return data
    } else {
      return cloneDeep(data)
    }
  }

  // Lodash的cloneDeep复制函数有问题 https://zhuanlan.zhihu.com/p/35530976
  set (name, data) {
    if (typeof data === 'function') {
      this.memory.set(name, data)
    } else {
      this.memory.set(name, cloneDeep(data))
    }
  }

  clear () {
    this.memory.clear()
  }
}
