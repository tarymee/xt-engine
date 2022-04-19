<template>
  <div
    class="xt-input xt-textinput"
    :class="{ 'xt-input-intable': $$intable }"
    :style="[viewStyle]"
  >
    <div
      v-if="!$$infilter && !$$intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
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
        :autosize="{ minRows: minrow, maxRows: maxrow}"
        :disabled="readonly"
        :placeholder="placeholder"
        :show-password="displaytype === 'password'"
        @change="handleChange"
      >
        <template
          v-if="$$infilter"
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
      displaytype: 'input', // password || textarea || input
      minrow: 2,
      maxrow: 6
    }
  },
  created () {
    this.dealViewRuleProp('displaytype', 'string', 'input')
    this.dealViewRuleProp('minrow', 'number', 2)
    this.dealViewRuleProp('maxrow', 'number', 6)
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
