<script>
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-tabboard',
  mixins: [baseMixin],
  data () {
    return {
      isContainerCtrl: true,
      currentTitle: '',
      value: this.returnViewRulePropValue('value', 'number', 0),
      cards: this.returnViewRulePropValue('cards', 'array', []),
      nextvalue: -1,
      iscanchange: true
    }
  },
  computed: {
    index () {
      return this.dealIndex(this.currentTitle)
    }
  },
  created() {
    // console.log(this.value)
    // debugger
    this.setValue(this.value, false)
  },
  mounted () {
    this.executeEvent('onload')
    this.dealHeight()
    this.dealTabHidden()
  },
  methods: {
    dealHeight () {
      if (this.viewStyle.height) {
        this.$el.querySelector('.el-tabs__content').style = `height: calc(100% - 55px);overflow: auto;`
        // this.$el.querySelectorAll('.el-tab-pane').forEach(element => {
        //   element.style = `height: 100%;overflow: auto;`
        // })
      }
    },
    dealTabHidden () {
      this.$nextTick(() => {
        if (this.$el && this.$el.querySelectorAll('.el-tabs__item')) {
          for (let i = 0, len = this.cards.length; i < len; i++) {
            let isHidden = this.returnValueBaseOnType(this.cards[i].hidden, 'boolean')
            const elTabsItem = this.$el.querySelectorAll('.el-tabs__item')[i]
            if (elTabsItem) {
              if (isHidden) {
                elTabsItem.style.display = 'none'
              } else {
                elTabsItem.style.display = 'inline-block'
              }
            }
          }
        }
      })
    },
    // 根据title计算index
    dealIndex (title) {
      return this.cards.findIndex((item) => {
        return item.title === title
      })
    },
    beforeLeave (e) {
      // console.log(e)
      // debugger
      this.nextvalue = this.dealIndex(e)
      this.executeEvent('onvaluechangebefore')
      setTimeout(() => {
        this.nextvalue = -1
        this.iscanchange = true
      }, 0)
      return this.iscanchange
    },
    getValue (getter) {
      return this.index
    },
    setValue (value, isvalidata = true) {
      // debugger
      if (Object.prototype.toString.call(value) === '[object Number]' && value >= 0) {
        if (this.cards.length) {
          if (this.cards[value]) {
            if (isvalidata) {
              if (this.beforeLeave(this.cards[value].title)) {
                this.currentTitle = this.cards[value].title
              }
            } else  {
              this.currentTitle = this.cards[value].title
            }
          } else {
            throw new Error('赋值已超过标签页个数！')
          }
        } else {
          this.currentTitle = ''
        }
      } else {
        throw new Error('赋值必须为大于等于 0 的数字！')
      }
    },
    // todo 校验tabboard内的控件 校验不通过切换到该tab
    validata () {
      let res = true
      const childrenInstace = this.getAllChildrenInstace()
      for (let i = 0, len = childrenInstace.length; i < len; i++) {
        const item = childrenInstace[i]
        if (!item.isContainerCtrl) {
          res = item.validata()
        }
        if (!res) {
          break
        }
      }
      return res
    },
    setPropReadonly (value) {
      // debugger
      // console.log(value)
      this.readonly = value
      const childrenInstace = this.getAllChildrenInstace()
      // console.log(childrenInstace)
      // debugger
      childrenInstace.forEach((item) => {
        if (!item.isContainerCtrl) {
          item.setProp('readonly', value)
        } else {
          item.readonly = value
        }
      })
    }
  },
  render: function (h) {
    const _this = this
    const cards = this.cards
    return h(
      'div',
      {
        attrs: {
          class: `xt-tabboard ${this.customClass}`
        },
        style: this.viewStyle
      },
      [
        h(
          'el-tabs',
          {
            props: {
              type: '',
              style: {
                height: '300px'
              },
              value: _this.currentTitle || '',
              beforeLeave: _this.beforeLeave
            },
            on: {
              'input' (newVal) {
                // console.log('input', newVal, _this.currentTitle)
                if (_this.currentTitle !== newVal) {
                  _this.currentTitle = newVal
                  _this.executeEvent('onvaluechange')
                }
              },
              'tab-click' (tab, event) {
                // console.log('tab-click', tab, event)
                // _this.executeEvent('onvaluechange')
              }
            }
          },
          [
            cards.map((item, i) => {
              let isHidden = _this.returnValueBaseOnType(item.hidden, 'boolean')
              return h(
                'el-tab-pane',
                {
                  props: {
                    // 如果是初始化就隐藏的 tab 其标题用-占位 因为真正隐藏该 tab 是要在 mounted 之后 不要让用户一开始就看到隐藏 tab 的标题
                    // 不用空值占位是因为 eleme 的 el-tab-pane 如果是用空值做标题 样式会有问题
                    label: !isHidden ? item.title : '-',
                    name: item.title
                  },
                  key: item.title
                },
                [
                  renderComponent(h, item)
                ]
              )
            })
          ]
        )
      ]
    )
  }
}
</script>

<style scoped>
.xt-tabboard {
  /* display: flex; */
}
.xt-tabboard .el-tabs {
  height: 100%;
}
.xt-tabboard .el-tab-pane {
  height: 100%;
  overflow: auto;
}
</style>

<style>
/* http: //taas.wxchina.com:17042/zentao/bug-view-63559.html */
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
  border-radius: 0!important;
}
</style>
