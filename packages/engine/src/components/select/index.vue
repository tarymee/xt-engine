<template>
  <xt-inputwrapper>
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
  </xt-inputwrapper>
</template>
<script>
// import { get } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'
import inputwrapper from '../inputwrapper'

export default {
  name: 'xt-select',
  components: {
    'xt-inputwrapper': inputwrapper
  },
  mixins: [baseInputMixin],
  data () {
    return {
      options: this.returnViewRulePropValue('options', 'array', []),
      multiselectable: this.returnViewRulePropValue('multiselectable', 'boolean'),
      remotesearch: this.returnViewRulePropValue('remotesearch', 'boolean'),
      remotesearchText: ''
    }
  },
  created () {
    this.setValue(this.value)
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
