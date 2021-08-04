<template>
  <div class="ide-ctrllist">
    <div
      v-for="(item, index) in ctrlList"
      :key="index"
      class="ide-ctrllist-item"
      @click="addCtrl(item)"
    >
      {{ item.title }}({{ item.type }})
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import ctrlConfig from '../configuration/ctrlConfig'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'preview',
  inject: {
    pageVM: {
      from: 'pageVM',
      default: null
    }
  },
  data () {
    return {
      ctrlList: [],
    }
  },
  created () {
    const ctrlList = []
    for (const x in ctrlConfig) {
      if (x !== 'default' && x !== 'body') {
        // console.log(x)
        const viewRule = {}
        ctrlConfig[x].forEach((item) => {
          if (item.defalutValue !== undefined && item.defalutValue !== null) {
            viewRule[item.property] = cloneDeep(item.defalutValue)
          }
        })
        ctrlList.push(viewRule)
      }
    }
    console.log(ctrlConfig)
    console.log(ctrlList)
    this.ctrlList = ctrlList
  },
  methods: {
    addCtrl (item) {
      this.pageVM.addCtrl(item)
    }
  }
}
</script>
