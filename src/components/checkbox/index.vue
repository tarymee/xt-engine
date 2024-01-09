<template>
  <div
    class="xt-input xt-checkbox"
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
      <el-checkbox-group
        v-model="value"
        :disabled="readonly"
        class="xt-checkbox-group"
        @change="handleChange"
      >
        <el-checkbox
          v-for="(item, index) in options"
          :key="index"
          :label="item.key"
          :disabled="item.disabled === '1'"
          :style="[checkboxStyle]"
        >
          {{ item.text }}
        </el-checkbox>
      </el-checkbox-group>

      <!-- <el-button @click="test">sss</el-button> -->
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-checkbox',
  mixins: [baseInputMixin],
  data () {
    return {
      value: this.returnViewRulePropValue('value', 'array', []),
      // [
      //   {
      //     "key": "1",
      //     "disabled": "1",
      //     "text": "启用"
      //   }
      // ]
      options: this.returnViewRulePropValue('options', 'array', []),
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'auto'), // auto | number
      valuetype: this.returnViewRulePropValue('valuetype', 'string', 'array') // string | array
    }
  },
  computed: {
    checkboxStyle () {
      let styleObj = {}
      if (this.displaytype !== 'auto') {
        styleObj.width = `${100 / Number(this.displaytype) - 5}%`
        styleObj.marginRight = `5%`
        styleObj.overflow = `hidden`
      }
      return styleObj
    }
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    },
    getValue (getter) {
      if (this.valuetype === 'string') {
        return (this.value && this.value.length) ? JSON.stringify(this.value) : ''
      } else {
        return cloneDeep(this.value)
      }
    },
    setValue (value, setter) {
      if (this.valuetype === 'string') {
        this.value = (value && !Array.isArray(value)) ? JSON.parse(value) : []
      } else {
        this.value = (value && Array.isArray(value) && value.length) ? cloneDeep(value) : []
      }
    },
    test (e) {
      console.log(this.value)
    }
  }
}
</script>

<style scoped>
/* .xt-checkbox {

} */
.xt-checkbox-group {
  padding: 6px 0;
}
</style>
