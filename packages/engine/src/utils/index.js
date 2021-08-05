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

export {
  fixLength
}
