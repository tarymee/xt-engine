import { Message } from 'element-ui'
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'

const fixLength = function (str) {
  if (str) {
    if (str.indexOf('%') > -1 || str.indexOf('px') > -1) {
      return str
    } else {
      return str + 'px'
    }
  } else {
    return ''
  }
}

const errorMessage = function (error) {
  let msg = (error.body && error.body.error_code) || error.statusText || error
  Message.error(msg)
}



const dealNoSameCode = function (viewRule) {
  viewRule.code = uuidv4()
  if (viewRule.content && viewRule.content.length) {
    viewRule.content.forEach((item) => {
      dealNoSameCode(item)
    })
  }
}
const copyNewViewRule = function (viewRule) {
  let newViewRule = cloneDeep(viewRule)
  dealNoSameCode(newViewRule)
  return newViewRule
}

export {
  fixLength,
  errorMessage,
  copyNewViewRule
}
