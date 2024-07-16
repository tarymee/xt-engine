<template>
  <div
    class="xt-input xt-date"
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
      <div v-if="textual" class="xt-input-content-text">
        {{ valueTextual }}
      </div>
      <el-date-picker
        v-else
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
import dayjs from 'dayjs'

export default {
  name: 'xt-date',
  mixins: [baseInputMixin],
  data () {
    return {
      format: this.returnViewRulePropValue('format', 'string', 'yyyy-MM-dd'),
      unit: this.returnViewRulePropValue('unit', 'string', 'date'),
    }
  },
  computed: {
    valueTextual () {
      const format = this.format.replace(/y/g, 'Y').replace(/d/g, 'D')
      // console.error(54454444)
      // console.log(format)
      // console.log(this.format)
      return this.value ? dayjs(Number(this.value)).format(format) : ''
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
