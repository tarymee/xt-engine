import BaseAction from './common/BaseAction'

export default class DefalutAction extends BaseAction {

  async action () {
    console.error(`引擎事件暂不支持 type = ${this.actionJson.type} 的行为 跳过执行`)

    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('DefalutAction success')
      }, 1000)
    })
    console.log(result)
    // throw new Error('出错了')
    return result

  }
}
