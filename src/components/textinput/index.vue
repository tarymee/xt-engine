<template>
  <div
    class="xt-input xt-textinput"
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
  <!-- <xt-inputwrapper>
    <template>
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
    </template>
  </xt-inputwrapper> -->
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'
// import inputwrapper from '../inputwrapper'
import { Message } from 'element-ui'

export default {
  name: 'xt-textinput',
  // components: {
  //   'xt-inputwrapper': inputwrapper
  // },
  mixins: [baseInputMixin],
  data () {
    return {
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'input'), // password || textarea || input
      maxlength: this.returnViewRulePropValue('maxlength', 'number'),
      minrow: this.returnViewRulePropValue('minrow', 'number', 2),
      maxrow: this.returnViewRulePropValue('maxrow', 'number', 6)
    }
  },
  mounted () {
    this.executeEvent('onload')
    // debugger
    // window.bbbb = this
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    },
    validata () {
      const requiredRes = this.requiredValidata()
      if (!requiredRes) return requiredRes
      if (this.maxlength !== '' && this.value.length > Number(this.maxlength)) {
        Message({
          message: `${this.title}最多支持输入${this.maxlength}个字`,
          type: 'error'
        })
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
/* .xt-textinput {

} */
</style>
