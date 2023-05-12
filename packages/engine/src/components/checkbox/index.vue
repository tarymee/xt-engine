<template>
  <xt-inputwrapper>
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
  </xt-inputwrapper>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'
import inputwrapper from '../inputwrapper'

export default {
  name: 'xt-checkbox',
  components: {
    'xt-inputwrapper': inputwrapper
  },
  mixins: [baseInputMixin],
  data () {
    return {
      value: this.returnViewRulePropValue('value', 'array', []),
      options: this.returnViewRulePropValue('options', 'array', []),
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'auto') // auto | number
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
  created () {
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
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
