<template>
  <xt-inputwrapper>
    <el-radio-group
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
  </xt-inputwrapper>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'
import inputwrapper from '../inputwrapper'

export default {
  name: 'xt-radio',
  components: {
    'xt-inputwrapper': inputwrapper
  },
  mixins: [baseInputMixin],
  data () {
    return {
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
