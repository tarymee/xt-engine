<script>
import { get, cloneDeep } from 'lodash-es'
import { utils } from '../../service'

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
      $$intable: false,
      $$infilter: false,
      $$inpopview: false,
      $$notMap: false,
      // value: get(this, 'viewRule.value', ''),
      // code: get(this, 'viewRule.code', ''),
      // title: get(this, 'viewRule.title', ''),
      // name: get(this, 'viewRule.name', ''),
      // type: get(this, 'viewRule.type', ''),
      // eventlist: get(this, 'viewRule.eventlist', []),
      // readonly: get(this, 'viewRule.readonly', false),
      // hidden: get(this, 'viewRule.hidden', false),
      // $$intable: get(this, 'viewRule.$$intable', false),
      // $$infilter: get(this, 'viewRule.$$infilter', false),
      // $$inpopview: get(this, 'viewRule.$$inpopview', false),
      // $$notMap: get(this, 'viewRule.$$notMap', false),
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
    this.value = get(this, 'viewRule.value', '')
    this.code = get(this, 'viewRule.code', '')
    this.title = get(this, 'viewRule.title', '')
    this.name = get(this, 'viewRule.name', '')
    this.type = get(this, 'viewRule.type', '')
    // todo 如果是string 表示是fylcode 要执行
    this.eventlist = get(this, 'viewRule.eventlist', [])
    this.readonly = get(this, 'viewRule.readonly', false)
    this.hidden = get(this, 'viewRule.hidden', false)
    this.$$intable = get(this, 'viewRule.$$intable', false)
    this.$$infilter = get(this, 'viewRule.$$infilter', false)
    this.$$inpopview = get(this, 'viewRule.$$inpopview', false)
    this.$$notMap = get(this, 'viewRule.$$notMap', false)

    if (!this.notInEngine) {
      if (!this.$$notMap) {
        if (this.engine.ctrlCodeMap.get(this.code)) {
          console.error(`code为${this.code}的控件重复`)
        }
        this.engine.ctrlCodeMap.set(this.code, this)

        if (this.name) {
          if (this.engine.ctrlNameCodeMap.get(this.name)) {
            console.error(`name为${this.name}的控件重复`)
          }
          this.engine.ctrlNameCodeMap.set(this.name, this.code)
        }
      }
    }
  },
  mounted () {
    this.executeEvent('onload')
  },
  // beforeDestroy () { },
  destroyed () {
    if (!this.notInEngine) {
      if (!this.$$notMap) {
        this.engine.ctrlCodeMap.delete(this.code)
        this.name && (this.engine.ctrlNameCodeMap.delete(this.name))
      }
    }
  },
  methods: {
    createBaseStyle () {
      const styleObj = {
        // flex: this.viewRule.flex === '1' ? this.viewRule.flex + ' 0 auto' : '',
        flex: this.viewRule.flex,
        width: utils.fixLength(this.viewRule.width),
        height: utils.fixLength(this.viewRule.height),
        marginLeft: utils.fixLength(this.viewRule.marginLeft),
        marginRight: utils.fixLength(this.viewRule.marginRight),
        marginTop: utils.fixLength(this.viewRule.marginTop),
        marginBottom: utils.fixLength(this.viewRule.marginBottom),
        paddingLeft: utils.fixLength(this.viewRule.paddingLeft),
        paddingRight: utils.fixLength(this.viewRule.paddingRight),
        paddingTop: utils.fixLength(this.viewRule.paddingTop),
        paddingBottom: utils.fixLength(this.viewRule.paddingBottom),
        flexDirection: this.viewRule.flexDirection,
        flexWrap: this.viewRule.flexWrap,
        justifyContent: this.viewRule.justifyContent,
        // maxWidth: utils.fixLength(this.viewRule.maxwidth),
        // minWidth: utils.fixLength(this.viewRule.minwidth),
        // maxHeight: utils.fixLength(this.viewRule.maxheight),
        // minHeight: utils.fixLength(this.viewRule.minheight),
        // flexWrap: this.viewRule.flexwrap,
        // flexShrink: this.viewRule.flexshrink || (this.viewRule.flex && this.viewRule.flex !== '' ? 0 : 1),
        // alignItems: this.viewRule.alignitems ? this.viewRule.alignitems : 'stretch'
      }
      // const styleObj = this.viewRule.style
      // 表格里的控件不需要宽度 继承表格头部的宽度
      if (this.$$intable) {
        delete styleObj.width
      }
      if (this.hidden) {
          styleObj.display = 'none'
      }
      return styleObj
    },
    executeEvent (triggerType, option = {}) {
      for (const event of this.eventlist) {
        if (event.trigger === triggerType && event.handler) {
          // console.log(triggerType)
          // console.log(this)
          // debugger
          console.log(`${this.type}【${this.title || this.name || this.code}】执行 ${triggerType}`)
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
    executeFlycode (value) {
      return this.engine.eventManager.runFlycode(value)
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
