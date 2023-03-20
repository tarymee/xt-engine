<template>
  <div
    class="xt-input xt-select"
    :class="{ 'xt-input-intable': intable }"
    :style="[viewStyle]"
  >
    <div
      v-if="!infilter && !intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
      class="xt-input-label"
      :style="{ width: titlewidth }"
    >
      <span v-if="required">*</span>{{ title }}
    </div>
    <div class="xt-input-content">
      <!-- :collapse-tags="multiselectable" -->
      <el-select
        v-model="value"
        size="small"
        :multiple="multiselectable"
        :placeholder="placeholder"
        filterable
        :remote="remotesearch"
        :remote-method="remoteMethod"
        :clearable="!hiddenclearbtn"
        :disabled="readonly"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.text"
          :value="item.key"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
// import { get } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-select',
  mixins: [baseInputMixin],
  data () {
    return {
      options: [],
      multiselectable: false,
      remotesearch: false,
      remotesearchText: ''
    }
  },
  created () {
    this.dealViewRuleProp('options', 'array', [])
    this.dealViewRuleProp('multiselectable', 'boolean')
    this.dealViewRuleProp('remotesearch', 'boolean')
    this.setValue(this.value)
  },
  methods: {
    handleChange () {
      console.log(this.value)
      this.executeEvent('onvaluechange')
    },
    // todo 多选改成数组
    getValue (getter) {
      if (this.multiselectable) {
        return (this.value && this.value.length) ? JSON.stringify(this.value) : ''
      } else {
        return this.value
      }
    },
    setValue (value, setter) {
      if (this.multiselectable) {
        if (value) {
          try {
            this.value = JSON.parse(value)
          } catch (err) {
            console.error(err)
            this.value = []
          }
        } else {
          this.value = []
        }
      } else {
        this.value = value
      }
    },
    remoteMethod (query) {
      this.remotesearchText = query
      this.executeEvent('onremotesearch')
    }
  }
}
</script>

<style scope>
/* .xt-text {

} */
</style>
