/**
 * 格式化日期
 * @param timestamp 时间戳
 * @param fmt 格式
 * @return 返回指定格式的日期
 * timestampToFormat(1585670400000, 'yyyy-MM-dd HH:mm:ss.SSS 星期w 第q季度')
 * ==>
 * 2018-04-19 18:43:24.829 星期四 第2季度
 */
function timestampToFormat (timestamp, fmt = 'yyyy-MM-dd HH:mm:ss') {
  const date = new Date(Number(timestamp))
  const o = {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'w': ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  for (const i in o) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = o[i] + ''
      if (i === 'w') return val
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}

/**
 * Date实例转fmt时间格式
 * @author tarymee
 * @param date Date实例
 * @return 返回格式化后的时间
 * @example
 */
function dateToFormat (date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  const timestamp = date.getTime()
  return timestampToFormat(timestamp, fmt)
}

/**
 * @desc 输入时间戳 返回基于type类型的时间对象 包含开始和结束以及当前时间
 * @author tarymee
 * @param timestamp 时间戳
 * @param type 类型
 * @example
 * timestampToBeginEnd(new Date('2020-03-18 17:49:56').getTime(), 'day')
 * ==>
 * {
 *     begin: '2020-03-18 00:00:00',
 *     current: '2020-03-18 17:49:56',
 *     end: '2020-03-18 23:59:59',
 * }
 *
 * timestampToBeginEnd(new Date('2020-03-18 17:49:56').getTime(), 'month')
 * ==>
 * {
 *     begin: '2020-03-01 00:00:00',
 *     current: '2020-03-18 17:49:56',
 *     end: '2020-03-31 23:59:59',
 * }
 */
function timestampToBeginEnd (timestamp, type) {
  if (!type) {
    console.error('时间函数请先传type[day/month/quarter/year/week/]类型')
    return false
  }
  const current = timestampToFormat(timestamp, 'yyyy-MM-dd HH:mm:ss')
  const date = new Date(Number(timestamp))
  if (type === 'day') {
    date.setHours(0, 0, 0)
    const begin = dateToFormat(date, 'yyyy-MM-dd HH:mm:ss')
    date.setHours(23, 59, 59)
    const end = dateToFormat(date, 'yyyy-MM-dd HH:mm:ss')
    return {
      begin,
      current,
      end
    }
  } else if (type === 'month') {
    const month = date.getMonth()
    date.setHours(0, 0, 0)

    // 开始 当月第1天 00:00:00
    date.setMonth(month, 1)
    const begin = dateToFormat(date, 'yyyy-MM-dd HH:mm:ss')

    // 结束 下个月第1天 00:00:00 - 1秒
    date.setMonth(month + 1, 1)
    const endts = date.getTime() - 1000
    const end = timestampToFormat(endts, 'yyyy-MM-dd HH:mm:ss')

    return {
      begin,
      current,
      end
    }
  } else if (type === 'quarter') {
    // 季度处理 1-3月为第1季度 以此类推
    const month = date.getMonth()
    date.setHours(0, 0, 0)
    let beginmonth
    let endmonth
    if (month >= 0 && month <= 2) {
      beginmonth = 0
      endmonth = 2
    } else if (month >= 3 && month <= 5) {
      beginmonth = 3
      endmonth = 5
    } else if (month >= 6 && month <= 8) {
      beginmonth = 6
      endmonth = 8
    } else if (month >= 9 && month <= 11) {
      beginmonth = 9
      endmonth = 11
    }

    // 开始 季度首月份第1天 00:00:00
    date.setMonth(beginmonth, 1)
    const begin = dateToFormat(date, 'yyyy-MM-dd HH:mm:ss')

    // 结束 季度未月份的下个月第1天 00:00:00 - 1秒
    date.setMonth((endmonth) + 1, 1)
    const endts = date.getTime() - 1000
    const end = timestampToFormat(endts, 'yyyy-MM-dd HH:mm:ss')

    return {
      begin,
      current,
      end
    }
  } else if (type === 'year') {
    const year = date.getFullYear()
    date.setHours(0, 0, 0)
    date.setMonth(0, 1)
    const begin = dateToFormat(date, 'yyyy-MM-dd HH:mm:ss')

    // 结束 明年第1天 00:00:00 - 1秒
    date.setFullYear(year + 1)
    const endts = date.getTime() - 1000
    const end = timestampToFormat(endts, 'yyyy-MM-dd HH:mm:ss')

    return {
      begin,
      current,
      end
    }
  } else if (type === 'week') {
    const onedayts = 24 * 3600 * 1000

    // 今天凌晨时间戳
    date.setHours(0, 0, 0)
    const todayts = date.getTime()

    // 两个参数表示取时间范围区间
    // 注意：左区间统一取 00:00:00 右区间统一取 23:59:59
    // 计算方法：先算出今天是星期几 基于今天星期几 算出左右区间差值天数
    // 星期一：1 - nowweek  星期天：7 - nowweek
    // 用今天凌晨与差值可算出区间
    const nowweek = date.getDay() // 星期，注意是0-6
    const beginsubday = 1 - nowweek
    const begints = todayts + (beginsubday * onedayts)
    const begin = timestampToFormat(begints, 'yyyy-MM-dd HH:mm:ss')

    const endsubday = 7 - nowweek
    const endts = todayts + (endsubday * onedayts) + onedayts - 1000
    const end = timestampToFormat(endts, 'yyyy-MM-dd HH:mm:ss')
    return {
      begin,
      current,
      end
    }
  }
}



const DateModel = {
  // 对参数进行 检测 兼容等处理
  dealArg: function (arg = []) {
    // 统一处理错误
    if (arg.length > 2) {
      console.error('时间函数不支持多于2个参数')
    } else if (arg.length === 0) {
      // 兼容空值
      arg = [0]
    }
    // TODO 统一处理成数字
    arg = arg.map((item) => Number(item))
    // TODO 区间检测 右边不小于左边
    return arg
  },
  // 处理单个时间
  dealDateSingle: function (type, arg) {
    const date = new Date()
    if (type === 'day') {
      const sub = date.getDate() + arg
      date.setDate(sub)
      const resultObj = timestampToBeginEnd(date.getTime(), type)
      return resultObj.current
    } else if (type === 'month') {
      // 先把时间设置为当前月的1号凌晨
      // 后面设置月份时才没有问题 因为并不是每个月都有31号，但每个月都有1号
      date.setDate(1)
      date.setHours(0, 0, 0)
      const sub = date.getMonth() + arg
      date.setMonth(sub)
      const resultObj = timestampToBeginEnd(date.getTime(), type)
      return resultObj.current
    } else if (type === 'quarter') {
      // 先把时间设置为当前月的1号凌晨
      // 后面设置月份时才没有问题 因为并不是每个月都有31号，但每个月都有1号
      date.setDate(1)
      const sub = date.getMonth() + (arg * 3)
      date.setMonth(sub)
      date.setHours(0, 0, 0)
      const resultObj = timestampToBeginEnd(date.getTime(), type)
      return resultObj.current
    } else if (type === 'year') {
      const sub = date.getFullYear() + arg
      date.setFullYear(sub)
      const resultObj = timestampToBeginEnd(date.getTime(), type)
      return resultObj.current
    } else if (type === 'week') {
      const sub = date.getDate() + (arg * 7)
      date.setDate(sub)
      const resultObj = timestampToBeginEnd(date.getTime(), type)
      return resultObj.current
      // week单值要处理成区间
      // return `${resultObj.begin},${resultObj.end}`
    }
  },
  // 处理时间区间
  // 两个参数表示取时间范围区间 左区间表示该时间类型第一天凌晨 右区间为该时间类型最后一天最后一秒
  // 举例： 目前时间为 2020-03-20 18:00:00
  // day(-1,1) = 2020-03-19 00:00:00,2020-03-21 23:59:59
  // month(0,0) = 2020-03-01 00:00:00,2020-03-31 23:59:59
  // year(0,1) = 2020-01-01 00:00:00,2021-12-31 23:59:59
  // week(0,0) = 2020-03-16 00:00:00,2021-03-22 23:59:59
  // quarter(0,1) = 2020-01-01 00:00:00,2021-06-30 23:59:59
  dealDateDouble: function (type, argLeft, argRight) {
    const begin = this.dealDateSingle(type, argLeft)
    const beginObj = timestampToBeginEnd(new Date(begin).getTime(), type)

    const end = this.dealDateSingle(type, argRight)
    const endObj = timestampToBeginEnd(new Date(end).getTime(), type)
    return `${beginObj.begin},${endObj.end}`
  },
  // 所有时间函数统一入口
  dealDate: function (type, arg = []) {
    // console.log(type, arg)
    if (!type) {
      console.error('时间函数请先传type[day/month/quarter/year/week/]类型')
      return false
    }
    arg = this.dealArg(arg)
    if (!arg) return false

    if (arg.length === 1) {
      return this.dealDateSingle(type, (arg)[0])
    } else if (arg.length === 2) {
      return this.dealDateDouble(type, (arg)[0], (arg)[1])
    }
  }
}

const supportDateFunctions = {
  day: function (argArray) {
    return DateModel.dealDate('day', argArray)
  },
  week: function (argArray) {
    return DateModel.dealDate('week', argArray)
  },
  month: function (argArray) {
    return DateModel.dealDate('month', argArray)
  },
  quarter: function (argArray) {
    return DateModel.dealDate('quarter', argArray)
  },
  year: function (argArray) {
    return DateModel.dealDate('year', argArray)
  },
  startMonth: function (argArray) {
    if (argArray.length > 1 || argArray.length < 1) {
      console.error('startMonth方法只支持1个参数')
      return false
    }
    const month = DateModel.dealDate('month', [argArray[0], argArray[0]])
    return month.split(',')[0]
  },
  endMonth: function (argArray) {
    if (argArray.length > 1 || argArray.length < 1) {
      console.error('endMonth方法只支持1个参数')
      return false
    }
    const month = DateModel.dealDate('month', [argArray[0], argArray[0]])
    return month.split(',')[1]
  },
  startYear: function (argArray) {
    if (argArray.length > 1 || argArray.length < 1) {
      console.error('startYear方法只支持1个参数')
      return false
    }
    const year = DateModel.dealDate('year', [argArray[0], argArray[0]])
    return year.split(',')[0]
  },
  endYear: function (argArray) {
    if (argArray.length > 1 || argArray.length < 1) {
      console.error('endYear方法只支持1个参数')
      return false
    }
    const year = DateModel.dealDate('year', [argArray[0], argArray[0]])
    return year.split(',')[1]
  },
  // 获取当前时间
  datetime: function () {
    return new Date().getTime() + ''
  },
  // 获取今天零时零分
  daytime: function () {
    const date = new Date()
    date.setHours(0, 0, 0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今天标准时间戳 2017-12-12 08:00:00
  dayStandardTime: function () {
    const currentDay = dateToFormat(new Date(), 'yyyy-MM-dd')
    return new Date(currentDay + ' 08:00:00').getTime()
  }
}
