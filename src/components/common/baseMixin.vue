<script>
import { get, cloneDeep } from 'lodash-es'
import { fixLength } from '../../service/utils'

export default {
  inject: {
    engine: {
      from: 'engine',
      default: null
    }
  },
  props: {
    viewRule: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      isInputCtrl: false,
      isContainerCtrl: false,
      isArrayCtrl: false,
      value: this.returnViewRulePropValue('value', 'string'),
      code: this.returnViewRulePropValue('code', 'string'),
      codepath: this.returnViewRulePropValue('codepath', 'array', []),
      title: this.returnViewRulePropValue('title', 'string'),
      name: this.returnViewRulePropValue('name', 'string'),
      type: this.returnViewRulePropValue('type', 'string'),
      eventlist: this.returnViewRulePropValue('eventlist', 'array', []),
      readonly: this.returnViewRulePropValue('readonly', 'boolean'),
      hidden: this.returnViewRulePropValue('hidden', 'boolean'),
      css: this.returnViewRulePropValue('css', 'string'),
      class: this.returnViewRulePropValue('class', 'string'),
      // $$intable $$inlist $$infilter $$ intabboard 去掉前面 $$
      // 详见 https://v2.vuejs.org/v2/api/#data
      // Properties that start with _ or $ will not be proxied on the Vue instance because they may conflict with Vue’s internal properties and API methods.You will have to access them as vm.$data._property.
      intable: this.dealInnerProps('intable', this.viewRule.parentcode),
      // 兼容之前写法 产品运营中心 openstatusname 注册的二开控件 有用到 $$intable
      $$intable: this.dealInnerProps('intable', this.viewRule.parentcode),
      inlist: this.dealInnerProps('inlist', this.viewRule.parentcode),
      inforeach: this.dealInnerProps('inforeach', this.viewRule.parentcode),
      infilter: this.dealInnerProps('infilter', this.viewRule.parentcode),
      intabboard: this.dealInnerProps('intabboard', this.viewRule.parentcode),
      notCreateVMInEngine: false,
    }
  },
  computed: {
    customClass () {
      return this.class
    },
    viewStyle () {
      const style = this.createBaseStyle()
      return style
    },
    notInEngine () {
      return !this.engine
    }
  },
  created () {
    // 在 数组型控件里面的 控件 因为数组会重复渲染控件 因此不在 engine 上挂载
    this.notCreateVMInEngine = this.intable || this.inlist || this.inforeach

    // 暂时兼容 table operations 按钮的 readonly 关键字
    if (this.viewRule.readonly === 'tableCheckedNumberIsEqualToZero' || this.viewRule.readonly === 'tableCheckedNumberIsNotEqualToOne') {
      this.readonly = false
    }
    // if (this.code === '14049334561561') {
    //   debugger
    // }

    this.css && this.addCSS()

    if (!this.notInEngine) {
      if (!this.notCreateVMInEngine) {
        if (this.engine.ctrlCodeMap.get(this.code)) {
          console.error(`code为【${this.code}】的控件重复, 请修改。`)
        }
        this.engine.ctrlCodeMap.set(this.code, this)

        if (this.name) {
          if (this.engine.ctrlNameCodeMap.get(this.name)) {
            console.error(`name为【${this.name}】的控件重复, 请修改。`)
          }
          this.engine.ctrlNameCodeMap.set(this.name, this.code)
        }
      }
    }
  },
  destroyed () {
    if (!this.notInEngine) {
      if (!this.notCreateVMInEngine) {
        // console.error('destroyed', this.code)
        this.engine.ctrlCodeMap.delete(this.code)
        this.name && (this.engine.ctrlNameCodeMap.delete(this.name))
      }
    }
    this.css && this.delCSS()
  },
  methods: {
    dealInnerProps (innerProp, parentcode) {
      if (!parentcode) return false

      const parentViewRule = this.engine.viewRuleMap.get(parentcode)
      if (!parentViewRule) return false

      const parentViewRuleType = parentViewRule.type

      if (innerProp === 'intable') {
        if (parentViewRuleType === 'table') {
          return true
        } else if (parentViewRuleType !== 'table' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      } else if (innerProp === 'inlist') {
        if (parentViewRuleType === 'list') {
          return true
        } else if (parentViewRuleType !== 'list' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      } else if (innerProp === 'inforeach') {
        if (parentViewRuleType === 'foreach') {
          return true
        } else if (parentViewRuleType !== 'foreach' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      } else if (innerProp === 'infilter') {
        if (parentViewRuleType === 'filter') {
          return true
        } else if (parentViewRuleType !== 'filter' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      } else if (innerProp === 'intabboard') {
        if (parentViewRuleType === 'tabboard') {
          return true
        } else if (parentViewRuleType !== 'tabboard' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      }
    },
    // dealViewRuleProp 替换成 returnViewRulePropValue 更加通用
    // 兼容保留 dealViewRuleProp 方法 二开控件有用到
    dealViewRuleProp (propName, type, defaultValue) {
      this[propName] = this.returnViewRulePropValue(propName, type, defaultValue)
    },
    // 处理控件属性值
    // 如果带有 fly 前缀 则使用 flycode 执行结果
    // 依据各属性值所属变量类型处理
    // 以 readonly 为例 它的值为 'fly: return true' | '' | '1' | '0' 映射到 vm 上的为 true | false
    returnViewRulePropValue (propName, type, defaultValue) {
      return this.returnValueBaseOnType(this.viewRule[propName], type, defaultValue)
    },
    returnValueBaseOnType (value, type, defaultValue) {
      // if (this.type === 'checkbox') {
      //   debugger
      // }
      const originValue = cloneDeep(value)
      if (originValue && typeof originValue === 'string' && originValue.indexOf('fly:') === 0) {
        return this.executeFlycode(originValue, {
          eventTarget: this
        })
      } else {
        if (type === 'boolean') {
          if (typeof originValue === 'undefined') {
            return (typeof defaultValue !== 'undefined') ? defaultValue : false
          } else {
            if (typeof originValue === 'boolean') {
              return originValue
            } else {
              return originValue === '1'
            }
          }
        } else if (type === 'string') {
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : ''
          return originValue || defaultValue
        } else if (type === 'number') {
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : ''
          if (typeof originValue === 'number') {
            return originValue
          } else if (typeof originValue === 'string' && originValue) {
            return Number(originValue)
          } else {
            return defaultValue
          }
        } else if (type === 'array') {
          // options eventlist
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : []
          return Array.isArray(originValue) ? originValue : defaultValue
        } else if (type === 'unit') {
          // 单位 titlewidth ...
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : ''
          return fixLength(originValue || defaultValue)
        } else if (type === 'any') {
          // 有可能是其他任意类型值
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : null
          return (typeof originValue !== 'undefined') ? originValue : defaultValue
        }
      }
    },
    createBaseStyle () {
      let styleObj = {
        // flex: this.viewRule.flex === '1' ? this.viewRule.flex + ' 0 auto' : '',
        flex: this.viewRule.flex,
        width: fixLength(this.viewRule.width),
        height: fixLength(this.viewRule.height),
        marginLeft: fixLength(this.viewRule.marginLeft),
        marginRight: fixLength(this.viewRule.marginRight),
        marginTop: fixLength(this.viewRule.marginTop),
        marginBottom: fixLength(this.viewRule.marginBottom),
        paddingLeft: fixLength(this.viewRule.paddingLeft),
        paddingRight: fixLength(this.viewRule.paddingRight),
        paddingTop: fixLength(this.viewRule.paddingTop),
        paddingBottom: fixLength(this.viewRule.paddingBottom),
        flexDirection: this.viewRule.flexDirection,
        flexWrap: this.viewRule.flexWrap,
        justifyContent: this.viewRule.justifyContent,
        // maxWidth: fixLength(this.viewRule.maxwidth),
        // minWidth: fixLength(this.viewRule.minwidth),
        // maxHeight: fixLength(this.viewRule.maxheight),
        // minHeight: fixLength(this.viewRule.minheight),
        // flexWrap: this.viewRule.flexwrap,
        // flexShrink: this.viewRule.flexshrink || (this.viewRule.flex && this.viewRule.flex !== '' ? 0 : 1),
        // alignItems: this.viewRule.alignitems ? this.viewRule.alignitems : 'stretch'
      }
      if (this.viewRule.style) {
        styleObj = {
          ...styleObj,
          ...this.viewRule.style
        }
      }
      // const styleObj = this.viewRule.style
      // 表格里的控件不需要宽度 继承表格头部的宽度
      if (this.intable) {
        delete styleObj.width
      }
      if (this.hidden) {
        styleObj.display = 'none'
      }
      return styleObj
    },
    handleClick () {
      // console.log(this)
      // console.log(this.engine)
      // 如果是在数组控件中 则需要等 row-click 执行完毕之后再执行
      // debugger
      if (this.intable || this.inlist || this.inforeach) {
        setTimeout(() => {
          this.executeEvent('onclicked')
        }, 0)
      } else {
        this.executeEvent('onclicked')
      }
    },
    executeEvent (triggerType, option = {}) {
      // if (this.type === 'list') {
      //   debugger
      // }
      for (const event of this.eventlist) {
        if (event.trigger === triggerType) {
          if (event.handler) {
            // console.log(triggerType)
            // console.log(this)
            // debugger
            // console.log(`${this.type}【${this.title || this.name || this.code}】执行 ${triggerType}`)
            if (!this.notInEngine) {
              this.engine.eventManager.runEventByCode(event.handler, {
                eventTarget: this,
                ...option
              })
            } else {
              // 兼容作为普通组件被引用时触发事件
              // this.$emit(triggerType)
              this.$parent[event.handler]({
                eventTarget: this,
                ...option
              })
            }
            break
          } else if (event.script) {
            // debugger
            this.executeFlycode(`fly: ${event.script}`, {
              eventTarget: this
            })
            break
          }
        }
      }
    },
    /**
     * @desc 执行 flycode
     * @todo 必须等所有控件生成之后再执行 不然如果 flycode 里有写到获取控件实例的话会报错
     * @author tarymee
     * @param {string} value
     * @return {any} 返回 flycode 执行结果
     * @example
     */
    executeFlycode (value, option = {}) {
      // if (value === 'fly: console.warn(eventTarget);return false') {
      //   console.log(value)
      //   console.log(option)
      //   debugger
      // }
      return this.engine.eventManager.runFlycode(value, option)
    },
    getValue (getter) {
      return cloneDeep(this.value)
    },
    setValue (value, setter) {
      this.value = cloneDeep(value)
    },
    getProp (type, getter) {
      return type === 'value' ? this.getValue(getter) : cloneDeep(this[type])
    },
    setProp (type, value, setter) {
      // debugger
      // type === 'value' ? this.setValue(value, setter) : this[type] = cloneDeep(value)
      if (type === 'value') {
        this.setValue(value, setter)
      } else if (type === 'content' && typeof this.setPropContent === 'function') {
        // todo
        this.setPropContent(value)
      } else if (type === 'readonly' && typeof this.setPropReadonly === 'function') {
        this.setPropReadonly(value)
      } else {
        this[type] = cloneDeep(value)
      }
    },
    validata () {
      return true
    },
    addCSS () {
      const styleEle = document.createElement('style')
      styleEle.type = 'text/css'
      styleEle.id = `${this.code}-css`
      styleEle.appendChild(document.createTextNode(this.css))
      document.getElementsByTagName('head')[0].appendChild(styleEle)
    },
    delCSS () {
      const styleEle = document.getElementById(`${this.code}-css`)
      styleEle && styleEle.remove()
      // document.getElementsByTagName('head')[0].removeChild(styleEle)
    },
    getAllChildrenInstace () {
      let childrenCtrlCode = []
      this.engine.ctrlCodeMap.forEach((item, key) => {
        // console.log(item, key)
        if (item.codepath && item.codepath.some((item) => item === this.code) && item.codepath[item.codepath.length - 1] !== this.code) {
          childrenCtrlCode.push(item.code)
        }
      })
      // console.log(childrenCtrlCode)
      // debugger
      const arr = []
      for (var [key, item] of this.engine.ctrlCodeMap) {
        // console.log(key, item)
        const inCtrlCodeMap = childrenCtrlCode.some((item) => item === key)
        if (inCtrlCodeMap) {
          arr.push(item)
        }
      }
      // console.log(arr)
      return arr
    },
  }
}
</script>
