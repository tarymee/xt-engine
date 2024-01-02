<template>
  <div
    class="xt-input xt-date"
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
      <el-date-picker
        v-model="value"
        size="small"
        :type="unit"
        :placeholder="placeholder"
        :disabled="readonly"
        :clearable="!hiddenclearbtn"
        :format="format"
        value-format="timestamp"
        @change="handleChange"
      />
    </div>
  </div>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-date',
  mixins: [baseInputMixin],
  data () {
    return {
      format: this.returnViewRulePropValue('format', 'string', 'yyyy-MM-dd'),
      unit: this.returnViewRulePropValue('unit', 'string', 'date'),
    }
  },
  created () {
    this.setValue(this.value)
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    handleChange (e) {
      // console.log(e)
      // console.log(this.value)
      this.executeEvent('onvaluechange')
    },
    getValue (getter) {
      return this.value ? this.value.toString() : ''
    },
    setValue (value, setter) {
      value ? this.value = Number(value) : this.value = null
    }
  }
}
</script>

<style scoped>

</style>
