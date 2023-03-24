<template>
  <div
    class="xt-input xt-textinput"
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
      <el-input
        v-model="value"
        size="small"
        :type="displaytype === 'textarea' ? 'textarea' : ''"
        :autosize="{ minRows: minrow, maxRows: maxrow }"
        :disabled="readonly"
        :placeholder="placeholder"
        :show-password="displaytype === 'password'"
        @change="handleChange"
      >
        <template
          v-if="infilter"
          #suffix
        >
          <i
            class="el-input__icon el-icon-search"
            style="cursor: pointer;"
            @click="handleChange"
          />
        </template>
      </el-input>
    </div>
  </div>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-textinput',
  mixins: [baseInputMixin],
  data () {
    return {
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'input'), // password || textarea || input
      minrow: this.returnViewRulePropValue('minrow', 'number', 2),
      maxrow: this.returnViewRulePropValue('maxrow', 'number', 6)
    }
  },
  created () {
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    }
  }
}
</script>

<style scope>
/* .xt-textinput {

} */
</style>
