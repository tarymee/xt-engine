<template>
  <div class="cfg-input cfg-textinput">
    <div class="cfg-input-label">
      {{ title }}
    </div>
    <div class="cfg-input-content">
      <el-input
        v-model="value"
        size="mini"
        :type="displaytype === 'textarea' ? 'textarea' : ''"
        :autosize="{ minRows: 2, maxRows: 4}"
        :disabled="readonly"
        :placeholder="placeholder"
        @input="handleChange"
      >
      </el-input>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import baseMixin from './baseMixin'

export default {
  name: 'cfg-textinput',
  mixins: [baseMixin],
  data () {
    return {
      displaytype: ''
    }
  },
  created () {
    this.value = get(this, 'viewRule.value', '')
    this.displaytype = get(this, 'viewRule.displaytype', '')
  },
  methods: {
    handleChange (e) {
      console.log('handleChange')
      this.pageVM.propertyChange(this.property, this.getValue())
    }
  }
}
</script>
