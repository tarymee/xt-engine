<template>
  <div
    class="xt-input xt-select"
    :class="[customClass, { 'xt-input-intable': intable }]"
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
      <span v-if="textual" class="xt-input-content-text">
        {{ valueTextual }}
      </span>
      <el-select
        v-else
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
      value: this.returnViewRulePropValue('value', 'any', ''),
      options: this.returnViewRulePropValue('options', 'array', []),
      multiselectable: this.returnViewRulePropValue('multiselectable', 'boolean'),
      remotesearch: this.returnViewRulePropValue('remotesearch', 'boolean'),
      remotesearchText: ''
    }
  },
  computed: {
    valueTextual () {
      if (this.value === '') {
        return ''
      } else {
        const selItem = this.options.find((item) => item.key === this.value)
        return selItem ? selItem.text : ''
      }
    }
  },
  created () {
    this.setValue(this.value)
    // window.aaaa = this
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    handleChange () {
      // console.log(this.value)
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

<style scoped>
/* .xt-text {

} */
</style>
