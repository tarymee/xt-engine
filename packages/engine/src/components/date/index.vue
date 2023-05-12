<template>
  <xt-inputwrapper>
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
  </xt-inputwrapper>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'
import inputwrapper from '../inputwrapper'

export default {
  name: 'xt-date',
  components: {
    'xt-inputwrapper': inputwrapper
  },
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
