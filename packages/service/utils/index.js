import { Message } from 'element-ui'

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

export {
  fixLength,
  errorMessage
}
