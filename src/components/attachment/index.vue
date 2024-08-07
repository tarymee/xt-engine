<template>
  <div class="xt-input xt-attachment" :class="[customClass, { 'xt-input-intable': intable }]" :style="[viewStyle]">
    <div
      v-if="!infilter && !intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
      class="xt-input-label"
      :style="{ width: titlewidth }"
    >
      <span v-if="required">*</span>{{ title }}
    </div>
    <div class="xt-input-content">
      <template v-if="!hidefile">
        <div v-for="(item, index) in value" :key="index" class="xt-attachment-item" :class="{ 'xt-attachment-item-readonly': (readonly || textual) }">
          <a class="xt-attachment-item-file" :href="item.url" target="_blank">
            <i class="el-icon-document"></i>
            {{ item.filename }}
          </a>
          <i v-if="item.__$$status === 'uploadding'" class="xt-attachment-item-icon el-icon-loading"></i>
          <i
            v-if="item.__$$status === 'done'"
            class="xt-attachment-item-icon el-icon-error"
            @click="handleRemove(index)"
          >
          </i>
          <i v-if="item.__$$status === 'done'" class="xt-attachment-item-icon el-icon-success"></i>
        </div>
      </template>
      <el-upload
        v-show="(maxnumber === '' || value.length < Number(maxnumber)) && !readonly && !textual"
        class="xt-attachment-upload" action="javascript:;"
        :before-upload="handlerBeforeUpload"
        :http-request="handleHttpRequest"
        :accept="accept"
        :show-file-list="false"
        :multiple="true"
      >
        <el-button
          size="small"
          :type="uploadtype"
          :icon="uploadicon"
          class="xt-attachment-btn"
        >
          {{ uploadtext }}
        </el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'
import { Message } from 'element-ui'
import { BITSToMB } from '../../service/utils'

export default {
  name: 'xt-attachment',
  mixins: [baseInputMixin],
  data () {
    return {
      selectFile: null,
      uploadtype: this.returnViewRulePropValue('uploadtype', 'string', ''),
      uploadtext: this.returnViewRulePropValue('uploadtext', 'string', '点击上传'),
      uploadicon: this.returnViewRulePropValue('uploadicon', 'string', 'el-icon-plus'),
      hidefile: this.returnViewRulePropValue('hidefile', 'boolean', false),
      maxnumber: this.returnViewRulePropValue('maxnumber', 'number'),
      // maxsize 单位 BITS 默认不限制
      // 1KB = 1024 BITS
      // 1M = 1024 * 1024 BITS
      // 数字类型 空字符串表示不限制
      maxsize: this.returnViewRulePropValue('maxsize', 'number'),
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
      // demo：
      // video/*
      // audio/*
      // image/*
      // image/png
      // image/*,.pdf
      // .jpg, .jpeg, .png
      accept: this.returnViewRulePropValue('accept', 'string')
    }
  },
  created () {
    this.setValue(this.value)
    // this.setValue([{
    //   filename: 'kjshkj客家话客家话看喀什法国航空结果很快就会可结合公司会计和高科技规划算法v控件',
    //   url: 'http://xxxx.xxx'
    // }])
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    getValue (getter) {
      const value = cloneDeep(this.value)
      return value.filter(item => item.__$$status === 'done').map((item) => {
        delete item.__$$status
        return item
      })

    },
    setValue (value, setter) {
      this.value = Array.isArray(value) ? value.map((item) => {
        return {
          ...item,
          __$$status: 'done'
        }
      }) : []
    },
    checkIsUploadding () {
      return this.value.some(item => item.__$$status === 'uploadding')
    },
    validata () {
      const requiredRes = this.requiredValidata()
      if (!requiredRes) return requiredRes
      if (this.checkIsUploadding()) {
        Message({
          message: `${this.title}正在上传中...`,
          type: 'error'
        })
        return false
      } else {
        return true
      }
    },
    handleSuccess (response) {
      // console.log('handleSuccess')
      // console.log(response)
      // 有 selectFile 表示正在上传中

      this.selectFile = null
      let lastItem = this.value[this.value.length - 1]
      this.value[this.value.length - 1] = {
        ...lastItem,
        ...response,
        __$$status: 'done'
      }
      this.$forceUpdate()
      // console.log(this.value)
      // debugger
      this.executeEvent('onvaluechange')
    },
    handleFail (errMsg) {
      // console.log('handleError')
      if (errMsg) {
        Message({
          message: errMsg,
          type: 'error'
        })
      }
      this.value.pop()
    },
    handleRemove (index) {
      // console.log(index)
      // console.log('handleRemove')
      this.value.splice(index, 1)
      this.executeEvent('onvaluechange')
    },
    handlerBeforeUpload (file) {
      if (this.checkIsUploadding()) {
        Message({
          message: `${this.title}正在上传中，请稍后`,
          type: 'error'
        })
        return false
      } else if (this.maxsize !== '' && file.size > Number(this.maxsize)) {
        Message({
          message: `${this.title}大小不能超过${BITSToMB(this.maxsize)}`,
          type: 'error'
        })
        return false
      } else if (this.maxnumber !== '' && this.value.length >= Number(this.maxnumber)) {
        Message({
          message: `${this.title}最多支持上传${this.maxnumber}个`,
          type: 'error'
        })
        return false
      }
    },
    handleHttpRequest (event) {
      // console.log('handleHttpRequest')
      // console.log(event)
      const file = event.file
      file.filename = file.name
      this.selectFile = file
      this.value.push({
        __$$status: 'uploadding',
        filename: file.name,
        url: ''
      })
      this.executeEvent('onupload')

    }
  }
}
</script>

<style scoped>
.xt-attachment-item {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  font-size: 12px;
  padding: 0 8px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  margin-bottom: 8px;
}
.xt-attachment-item-readonly {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
}
.xt-attachment-item:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
}
.xt-attachment-item-file {
  width: 90%;
  display: block;
  cursor: pointer;
  color: #606266;
  text-decoration-line: none;
}

.xt-attachment-item-icon {
  line-height: 30px !important;
  font-size: 14px;
}

.xt-attachment-item .el-icon-error {
  display: none !important;
  color: red !important;
  cursor: pointer;
}

.xt-attachment-item .el-icon-success {
  display: block !important;
  color: #67c23a !important;
}

.xt-attachment-item.xt-attachment-item-readonly:hover .el-icon-success {
  display: block !important;
}
.xt-attachment-item.xt-attachment-item-readonly:hover .el-icon-error {
  display: none !important;
}

.xt-attachment-item:hover .xt-attachment-item-file {
  color: #409eff;
}

.xt-attachment-item:hover .el-icon-success {
  display: none !important;
}

.xt-attachment-item:hover .el-icon-error {
  display: block !important;
}

.xt-attachment-upload .el-upload {
  width: 100%;
}

.xt-attachment-btn {
  display: block;
  width: 100%;
}
</style>
<style>
.xt-table .el-table .cell .xt-attachment {
  line-height: normal;
}
.xt-table .el-table td.el-table__cell .xt-attachment div {
  box-sizing: initial;
}
</style>
