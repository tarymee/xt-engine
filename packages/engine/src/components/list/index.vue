<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { fixLength } from '../../utils'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-list',
  components: {
    'xt-widget-none': () => import('../../widget/none')
  },
  mixins: [baseMixin],
  data () {
    return {
      pageable: false,
      checkable: false,
      pageInfo: null,
      value: []
    }
  },
  watch: {
    hidden (newValue, oldValue) {
      if (newValue) {
        this.setValue(null)
      }
    }
  },
  created () {
    console.log(5555)
    console.log(this.viewRule.pageable = 888)
    this.dealViewRuleProp('value', 'array', [])
    this.dealViewRuleProp('pageable', 'boolean')
    this.dealViewRuleProp('checkable', 'boolean')
    this.pageInfo = this.pageable ? {
      __pageindex: 1,
      __pagesize: Number(this.viewRule.pagesize || 20),
      __itemcount: 0
    } : null
  },
  methods: {
    validata () {
      let res = true
      return res
    },
    getValue (getter) {
      // debugger
      const scope = get(getter, 'ctrl.scope', 'all')
      // const datatype = get(getter, 'datatype', '1')
      const realtimeValue = this.getRealtimeValue()
      let result
      // debugger
      if (scope === 'focused') {
        result = realtimeValue.find((item) => item.__$$focused)
      } else if (scope === 'checked') {
        result = realtimeValue.filter((item) => item.__$$checked)
      } else {
        result = realtimeValue
      }
      return this.delInsidePropery(result)
    },
    setValue (data, setter) {
      // todo 这里用js滚动到顶部
      // if (setter) {}
      this.value = []
      setTimeout(() => {
        this.value = cloneDeep(data.map((item, i) => {
          return {
            __$$index: i,
            __$$uuid: uuidv4(),
            __$$focused: false,
            __$$checked: false,
            ...item
          }
        }))
        console.log(this.value)
        // this.executeEvent('onchecked')
      }, 0)
    },
    setPageInfo (pageInfo) {
      if (pageInfo) {
        this.pageInfo = {
          __pageindex: Number(pageInfo.__pageindex),
          __pagesize: Number(pageInfo.__pagesize),
          __itemcount: Number(pageInfo.__itemcount)
        }
      } else {
        this.pageInfo = null
      }
    }
  },
  render: function (h) {
    const rows = get(this.viewRule, 'rows', {})
    const content = get(this.viewRule, 'rows.content', [])
    // const operations = get(this.viewRule, 'operations', [])
    // const operationsClone = cloneDeep(operations)
    return h(
      'div',
      {
        attrs: {
          class: 'xt-list'
        },
        style: this.viewStyle,
      },
      [
        this.value.map((item) => {
          return h(
            'div',
            {
              attrs: {
                class: 'xt-list-item'
              },
              style: rows.style,
            },
            [
              content.map((item2, i) => {
                return renderComponent(h, item2, {
                  ...rows,
                  parent: {
                    ...this.viewRule,
                    parent: {
                      ...this.parentViewRule
                    }
                  }
                })
              })
            ]
          )
        })
      ]
    )
  }
}
</script>

<style scoped>
.xt-list {
  /* display: flex; */
}
.xt-list-item {
  display: flex;
}
.xt-list-footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>

