<script>
import { get, cloneDeep } from 'lodash-es'
import { fixLength } from '../../utils'
import { v4 as uuidv4 } from 'uuid'

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
      value: '',
      code: '',
      title: '',
      name: '',
      type: '',
      eventlist: [],
      readonly: false,
      hidden: false,
      intable: this.dealInnerProps('intable', this.viewRule.parentcode),
      inlist: this.dealInnerProps('inlist', this.viewRule.parentcode),
      infilter: this.dealInnerProps('infilter', this.viewRule.parentcode),
      inpopview: this.dealInnerProps('inpopview', this.viewRule.parentcode),
      intabboard: this.dealInnerProps('intabboard', this.viewRule.parentcode),
      notCreateVMInEngine: false
    }
  },
  computed: {
    viewStyle () {
      const style = this.createBaseStyle()
      return style
    },
    notInEngine () {
      return !this.engine
    }
  },
  created () {
    this.dealViewRuleProp('type', 'string')
    this.dealViewRuleProp('code', 'string')
    this.dealViewRuleProp('title', 'string')
    this.dealViewRuleProp('name', 'string')
    this.dealViewRuleProp('value', 'string')

    this.dealViewRuleProp('readonly', 'boolean')
    this.dealViewRuleProp('hidden', 'boolean')
    this.dealViewRuleProp('eventlist', 'array', [])

    this.notCreateVMInEngine = this.intable || this.inlist

    // 暂时兼容 table operations 按钮的 readonly 关键字
    if (this.viewRule.readonly === 'tableCheckedNumberIsEqualToZero' || this.viewRule.readonly === 'tableCheckedNumberIsNotEqualToOne') {
      this.readonly = false
    }
    // if (this.code === '14049334561561') {
    //   debugger
    // }

    if (!this.notInEngine) {
      if (!this.notCreateVMInEngine) {
        if (this.engine.ctrlCodeMap.get(this.code)) {
          console.error(`code为${this.code}的控件重复, 请修改。`)
        }
        this.engine.ctrlCodeMap.set(this.code, this)

        if (this.name) {
          if (this.engine.ctrlNameCodeMap.get(this.name)) {
            console.error(`name为${this.name}的控件重复, 请修改。`)
          }
          this.engine.ctrlNameCodeMap.set(this.name, this.code)
        }
      }
    }
  },
  mounted () {
    this.executeEvent('onload')
  },
  destroyed () {
    if (!this.notInEngine) {
      if (!this.notCreateVMInEngine) {
        this.engine.ctrlCodeMap.delete(this.code)
        this.name && (this.engine.ctrlNameCodeMap.delete(this.name))
      }
    }
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
      } else if (innerProp === 'infilter') {
        if (parentViewRuleType === 'filter') {
          return true
        } else if (parentViewRuleType !== 'filter' && parentViewRule.parentcode) {
          return this.dealInnerProps(innerProp, parentViewRule.parentcode)
        } else {
          return false
        }
      } else if (innerProp === 'inpopview') {
        if (parentViewRuleType === 'popview') {
          return true
        } else if (parentViewRuleType !== 'popview' && parentViewRule.parentcode) {
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
    // 处理控件属性值
    // 如果带有 fly 前缀 则使用 flycode 执行结果
    // 依据各属性值所属变量类型处理
    // 以 readonly 为例 它的值为 'fly: return true' | '' | '1' | '0' 映射到 vm 上的为 true | false
    dealViewRuleProp (propName, type, defaultValue) {
      // if (this.type === 'checkbox') {
      //   debugger
      // }
      const originValue = this.viewRule[propName]
      if (originValue && typeof originValue === 'string' && originValue.indexOf('fly:') === 0) {
        // todo flycode
        this[propName] = this.executeFlycode(originValue, {
          eventTarget: this
        })
      } else {
        if (type === 'boolean') {
          this[propName] = originValue === '1'
        } else if (type === 'string') {
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : ''
          this[propName] = originValue || defaultValue
        } else if (type === 'number') {
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : 0
          if (typeof originValue === 'number') {
            this[propName] = originValue
          } else if (typeof originValue === 'string' && originValue) {
            this[propName] = Number(originValue)
          } else {
            this[propName] = defaultValue
          }
        } else if (type === 'array') {
          // options eventlist
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : []
          this[propName] = Array.isArray(originValue) ? cloneDeep(originValue) : defaultValue
        } else {
          // 有可能是其他任意类型值
          defaultValue = (typeof defaultValue !== 'undefined') ? defaultValue : null
          this[propName] = (typeof originValue !== 'undefined') ? cloneDeep(originValue) : defaultValue
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
      if (this.intable || this.list) {
        setTimeout(() => {
          this.executeEvent('onclicked')
        }, 0)
      } else {
        this.executeEvent('onclicked')
      }
    },
    executeEvent (triggerType, option = {}) {
      for (const event of this.eventlist) {
        if (event.trigger === triggerType && event.handler) {
          // console.log(triggerType)
          // console.log(this)
          // debugger
          // console.log(`${this.type}【${this.title || this.name || this.code}】执行 ${triggerType}`)
          if (!this.notInEngine) {
            this.engine.eventManager.runEvent(event.handler, {
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
      type === 'value' ? this.setValue(value, setter) : this[type] = cloneDeep(value)
    },
    validata () {
      return true
    }
  }
}
</script>

<style scope>

</style>
