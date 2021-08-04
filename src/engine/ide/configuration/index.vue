<template>
  <div class="ide-configuration">
    <div v-for="item in curCtrlConfiguration" :key="item.code">
      <!-- {{ item }} -->
      <!-- {{ item.code }} -->
      <cfg-textinput
        v-if="item.type === 'textinput'"
        :view-rule="item"
      ></cfg-textinput>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import ctrlConfig from './ctrlConfig'
import cfgComponents from './components'

export default {
  name: 'configuration',
  inject: {
    pageVM: {
      from: 'pageVM',
      default: null
    }
  },
  components: {
    'cfg-textinput': cfgComponents.textinput
  },
  props: {
    curCtrlViewRule: {
      type: Object,
      default: function  () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    curCtrlConfiguration () {
      console.log(this.curCtrlViewRule)
      // debugger
      // return this.curCtrlViewRule ? (ctrlConfig[this.curCtrlViewRule.type] || ctrlConfig['default']) : []
      if (this.curCtrlViewRule) {
        const a = cloneDeep(ctrlConfig[this.curCtrlViewRule.type] || ctrlConfig['default'])
        const b = a.map((item) => {
          let value = this.curCtrlViewRule[item.property]
          if (value === undefined) {
            value = item.defalutValue
          }

          const obj = {
            ...item.component,
            title: item.title,
            property: item.property,
            code: `${this.curCtrlViewRule.code}-${item.property}`
          }
          if (value !== undefined) {
            obj.value = value
          }
          return obj
        })
        console.log(a)
        console.log(b)
        return b
      } else {
        return []
      }
    }
  }
}
</script>
