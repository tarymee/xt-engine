import BaseAction from './common/BaseAction'
import { get } from 'lodash-es'
export default class FlycodeAction extends BaseAction {

  async action () {
    // console.log(this.eventManager)
    // console.log(engine)
    let script = get(this.actionJson, 'script', '')
    if (script) {
      script = `fly:${script}`
      const flyCodeResult = this.eventManager.runFlycode(script, this.option)
      const flyCodeResultType = Object.prototype.toString.call(flyCodeResult)
      if (flyCodeResultType === '[object Error]') {
        throw Error(flyCodeResult.message)
      } else if (flyCodeResultType === '[object Promise]') {
        // flycode 里支持 return 一个 promise 接入并串行执行
        // flyCodeResult.then(function (res: any) {
        //     // resolve()
        //     console.log(res)
        // }).catch(function () {
        //     // reject(e && e.message || e)
        // })
      }
      return flyCodeResult
    }
  }

}
