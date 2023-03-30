<template>
  <div class="xt-input xt-attachment" :class="{ 'xt-input-intable': intable }" :style="[viewStyle]">
    <div v-if="!infilter && !intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'" class="xt-input-label" :style="{ width: titlewidth }">
      <span v-if="required">*</span>{{ title }}
    </div>
    <div class="xt-input-content">
      <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
      <!-- :on-preview="handlePreview" -->
      <!-- :on-exceed="handleExceed" -->
      <!-- :on-change="handleChange" -->
      <!-- :on-success="handleSuccess" -->
      <!-- :on-error="handleError" -->
      <!-- :on-progress="handleOnProgress" -->

      <div v-for="(item, index) in value" :key="index" class="xt-attachment-item">
        <a class="xt-attachment-item-file" :href="item.url" target="_blank">
          <i class="el-icon-document"></i>
          {{ item.filename }}
        </a>
        <i v-if="item.status === 'uploadding'" class="xt-attachment-item-icon el-icon-loading"></i>
        <i v-if="item.status !== 'uploadding'" class="xt-attachment-item-icon el-icon-error" @click="handleRemove(index)"></i>
        <i v-if="item.status !== 'uploadding'" class="xt-attachment-item-icon el-icon-success"></i>
      </div>
      <!-- :file-list="value" -->
      <el-upload v-show="value.length < maxnumber" ref="attachment" class="xt-attachment-upload" action="javascript:;" :disabled="readonly" :before-upload="handlerBeforeUpload" :http-request="handleHttpRequest" :accept="accept" :show-file-list="false" :multiple="true">
        <el-button size="small" :disabled="readonly" icon="el-icon-plus" class="xt-attachment-btn">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
// import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'
import { Message } from 'element-ui'

export default {
  name: 'xt-attachment',
  mixins: [baseInputMixin],
  data () {
    return {
      selectFile: null,
      // todo 支持不限制
      maxnumber: this.returnViewRulePropValue('maxnumber', 'number', 5),
      maxsize: this.returnViewRulePropValue('maxsize', 'number', 1024 * 1024 * 10), // maxsize 单位 KB 默认 10M
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
    // console.log(this.maxsize)
    // debugger
    this.setValue(this.value)
    // this.setValue([{
    //   name: 'kjshkj客家话客家话看喀什法国航空结果很快就会可结合公司会计和高科技规划算法v控件',
    //   url: ''
    // }])
  },
  methods: {
    getValue (getter) {
      return this.value.filter(item => item.status !== 'uploadding').map((item) => {
        return {
          filename: item.filename,
          url: item.url
        }
      })
    },
    setValue (value, setter) {
      this.value = Array.isArray(value) ? value : []
    },
    validata () {
      const requiredRes = this.requiredValidata()
      if (requiredRes) {
        return requiredRes
      } else {
        const isUploadding = this.value.some(item => item.status === 'uploadding')
        if (isUploadding) {
          Message({
            message: `${this.title}正在上传中...`,
            type: 'error'
          })
          return false
        } else {
          return true
        }
      }
    },
    handleSuccess (response) {
      // console.log('handleSuccess')
      // console.log(response)
      // 有 selectFile 表示正在上传中
      this.selectFile = null
      this.value.shift()
      this.value.unshift(response)
      this.executeEvent('onvaluechange')
    },
    handleFail () {
      // console.log('handleError')
      this.value.shift()
    },
    handleRemove (index) {
      // console.log(index)
      // console.log('handleRemove')
      this.value.splice(index, 1)
      this.executeEvent('onvaluechange')
    },
    // handlePreview (file) {
    //   console.log('handlePreview')
    //   console.log(file)
    // },
    handlerBeforeUpload (file) {
      console.log(file)
      // debugger
      if (file.size > this.maxsize) {
        Message({
          message: `${this.title}大小不能超过${this.maxsize}KB`,
          type: 'error'
        })
        return false
      } else if (this.value.length >= this.maxnumber) {
        Message({
          message: `${this.title}最多支持上传${this.maxnumber}个`,
          type: 'error'
        })
        return false
      }
    },
    handleHttpRequest (attachment) {
      // console.log('handleHttpRequest')
      // console.log(attachment)
      attachment.file.status = 'uploadding'
      attachment.file.filename = attachment.file.name
      this.selectFile = attachment.file
      this.value.unshift(this.selectFile)
      // return Promise.resolve(attachment.file)
      this.executeEvent('onupload')
    }
  }
}
</script>

<style scope>
.xt-attachment-item {
  display: flex;
  justify-content: space-between;
  /* height: 24px; */
  line-height: 24px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-size: 12px;
  padding: 0 4px;
  color: #606266;
}

.xt-attachment-item-file {
  width: 90%;
  display: block;
  cursor: pointer;
  color: #606266;
}

.xt-attachment-item-icon {
  line-height: 24px !important;
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

.xt-attachment-item:hover {
  background-color: #f5f7fa;
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
