<template>
  <div
    class="xt-input xt-attachment"
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
      <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
      <!-- :on-preview="handlePreview" -->
      <!-- :on-exceed="handleExceed" -->
      <!-- :on-change="handleChange" -->
      <!-- :on-success="handleSuccess" -->
      <!-- :on-error="handleOnError" -->
      <!-- :on-progress="handleOnProgress" -->
      <el-upload
        v-show="!readonly"
        ref="attachment"
        class="upload-demo"
        action="javascript:;"
        :before-upload="handlerBeforeUpload"
        :on-remove="handleRemove"
        :http-request="handleHttpRequest"
        :file-list="value"
        :show-file-list="false"
        :multiple="true"
      >
        <el-button size="small" icon="el-icon-plus">点击上传</el-button>
        <div v-for="(item, index) in value" :key="index">
          {{ item.name }}
        </div>
      </el-upload>

      <!-- <el-input
        v-model="value"
        size="small"
        :type="displaytype === 'textarea' ? 'textarea' : ''"
        :autosize="{ minRows: 2, maxRows: 4}"
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
      </el-input> -->
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-attachment',
  mixins: [baseInputMixin],
  data () {
    return {
      selectFile: null,
      maxnumber: 5,
      maxsize: 10240,
      accept: ''
    }
  },
  created () {
    this.computeNumberProp('maxnumber', 5)
    // maxsize 单位 kb 默认 10m
    this.computeStringProp('maxsize', 10240)
    this.computeStringProp('accept')
    this.setValue(this.value)
  },
  methods: {
    getValue (getter) {
      return cloneDeep(this.value)
    },
    setValue (value, setter) {
      value = cloneDeep(value)
      this.value = Array.isArray(value) ? value : []
      // 有 selectFile 表示正在上传中
      if (this.selectFile) {
        this.selectFile = null
        this.executeEvent('onvaluechange')
      }
    },
    // handleChange (file, fileList) {
    //   console.log('handleChange')
    //   console.log(file, fileList)
    //   // this.executeEvent('onvaluechange')
    // },
    // handleSuccess (response, file, fileList) {
    //   console.log('handleSuccess')
    //   console.log(response, file, fileList)
    // },
    handleRemove (file, fileList) {
      console.log('handleRemove')
      console.log(file, fileList)
    },
    // handlePreview (file) {
    //   console.log('handlePreview')
    //   console.log(file)
    // },
    // handleExceed (files, fileList) {
    //   console.log('handleExceed')
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    handlerBeforeUpload (file) {
      console.log('handlerBeforeUpload')
      console.log(file)
      console.log(this.value.length)
      if (this.value.length >= this.maxnumber) {
        console.log(`最多支持上传${this.maxnumber}个`)
        return false
      }
      // return false
    },
    // handleOnProgress (event, file, fileList) {
    //   console.log('handleOnProgress')
    //   console.log(event, file, fileList)
    // },
    // handleOnError (err, file, fileList) {
    //   console.log('handleOnError')
    //   console.error(err, file, fileList)
    // },
    handleHttpRequest (attachment) {
      console.log('handleHttpRequest')
      // console.log(attachment)
      this.selectFile = attachment.file
      // return Promise.resolve(attachment.file)
      this.executeEvent('onupload')
    }
  }
}
</script>

<style scope>
/* .xt-attachment {

} */
</style>
