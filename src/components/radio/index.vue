<template>
  <div
    class="xt-input xt-radio"
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
      <span v-if="textual" class="xt-input-content-text">
        {{ valueTextual }}
      </span>
      <el-radio-group
        v-else
        v-model="value"
        :disabled="readonly"
        class="xt-radio-group"
        @change="handleChange"
      >
        <el-radio
          v-for="(item, index) in options"
          :key="index"
          :label="item.key"
          :disabled="item.disabled === '1'"
          :style="[radioStyle]"
        >
          {{ item.text }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-radio',
  mixins: [baseInputMixin],
  data () {
    return {
      // [
      //   {
      //     "key": "1",
      //     "disabled": "1",
      //     "text": "启用"
      //   }
      // ]
      options: this.returnViewRulePropValue('options', 'array', []),
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'auto') // auto / number
    }
  },
  computed: {
    radioStyle () {
      let styleObj = {}
      if (this.displaytype !== 'auto') {
        styleObj.width = `${100 / Number(this.displaytype) - 5}%`
        styleObj.marginRight = `5%`
        styleObj.overflow = `hidden`
      }
      return styleObj
    },
    valueTextual () {
      if (this.value === '') {
        return ''
      } else {
        const selItem = this.options.find((item) => item.key === this.value)
        return selItem ? selItem.text : ''
      }
    }
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    }
  }
}
</script>

<style scoped>
/* .xt-radio {

} */
.xt-radio-group {
  display: block!important;
  padding: 6px 0;
}
.xt-radio-group .el-radio {
  line-height: 20px;
}
</style>
<style>
.xt-table .el-table .cell .xt-radio {
  line-height: normal;
}
</style>
