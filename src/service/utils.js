
const isNumber = function (value) {
  return value ? (Number(value) === +Number(value)) : false
}

const fixLength = function (str) {
  if (str) {
    if (isNumber(str)) {
      return str + 'px'
    } else {
      return str
    }
  } else {
    return ''
  }
}

const BITSToMB = (size) => {
  const res = Number(size) / (1024 * 1024)
  return toDecimal(res, 3) + 'MB'
}

// 四舍五入 保留 count 位小数
function toDecimal (num, count = 3) {
  const base = Math.pow(10, count)
  let f = parseFloat(num)
  if (isNaN(f)) {
    return
  }
  f = Math.round(num * base) / base
  var str = f.toString()
  // var strArr = str.split('.')
  // if (strArr.length == 1) {
  //   str = str + '.00'
  // } else if (strArr.length > 1) {
  //   if (strArr[1].length == 1) {
  //     str = str + '0'
  //   }
  // }
  return str
}



export {
  isNumber,
  fixLength,
  BITSToMB
}
