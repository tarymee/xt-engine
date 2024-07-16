<template>
  <div class="xt-input xt-photo" :class="[customClass, { 'xt-input-intable': intable }]" :style="[viewStyle]">
    <div v-if="!infilter && !intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'" class="xt-input-label" :style="{ width: titlewidth }">
      <span v-if="required">*</span>{{ title }}
    </div>
    <div class="xt-input-content">
      <div class="xt-photo-content">
        <div v-for="(item, index) in value" :key="index" v-loading="item.__$$status === 'uploadding'" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="上传中" class="xt-photo-item">
          <el-image style="width: 80px; height: 80px" :src="item.__$$base64 || item.url" fit="cover" :preview-src-list="previewList"></el-image>
          <i v-if="item.__$$status === 'done' && !readonly && !textual" class="xt-photo-item-icon el-icon-error" @click="handleRemove(index)"></i>
        </div>
        <el-upload v-show="(maxnumber === '' || value.length < Number(maxnumber)) && !readonly && !textual" class="xt-photo-upload" action="javascript:;" :before-upload="handlerBeforeUpload" :http-request="handleHttpRequest" :accept="accept" :show-file-list="false" :multiple="true">
          <div class="xt-photo-btn"><i class="xt-photo-btn-icon el-icon-plus"></i></div>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'
import { Message } from 'element-ui'
import { BITSToMB } from '../../service/utils'

export default {
  name: 'xt-photo',
  mixins: [baseInputMixin],
  data () {
    return {
      selectFile: null,
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
      accept: this.returnViewRulePropValue('accept', 'string', 'image/*')
    }
  },
  computed: {
    previewList () {
      return this.value.map((item) => {
        return item.__$$base64 || item.url
      })
    }
  },
  created () {
    this.setValue()
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
        delete item.__$$base64
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

      // debugger
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
      // console.log(file)
      // debugger
      if (this.checkIsUploadding()) {
        Message({
          message: `${this.title}正在上传中，请稍后`,
          type: 'error'
        })
        return false
      } else if (!file.type.startsWith('image/')) {
        Message({
          message: `请选择图片上传`,
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
    fileToBase64 (file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          resolve(e.target.result)
        }
      })
    },
    async handleHttpRequest (event) {
      // console.log('handleHttpRequest')
      // console.log(event)
      const file = event.file
      file.filename = file.name
      this.selectFile = file
      const base64 = await this.fileToBase64(file)
      this.value.push({
        __$$status: 'uploadding',
        __$$base64: base64,
        filename: file.name,
        url: ''
      })
      this.executeEvent('onupload')
    }
  }
}
</script>

<style scoped>
.xt-photo-content {
  display: flex;
  flex-wrap: wrap;
}
.xt-photo-item {
  display: flex;
  width: 80px;
  height: 80px;
  /* border-radius: 4px; */
  border: 1px dashed #d9d9d9;
  margin-right: 12px;
  position: relative;
}
.xt-photo-item:hover {
  border: 1px dashed #409EFF;
}
.xt-photo-item-img {
  width: 80px;
  height: 80px;
  display: block;
}
.xt-photo-item-img img {
  width: 80px;
  height: 80px;
  display: block;
}

.xt-photo-item-icon {
  font-size: 18px;
  position: absolute;
  top: 0px;
  right: 0px;
  color: red;
  cursor: pointer;
  background-color: #FFF;
  border-radius: 9px;
  display: none;
}
.xt-photo-item:hover .xt-photo-item-icon {
  display: block;
}

.xt-photo-btn {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  color: #999;
}
.xt-photo-btn:hover {
  border: 1px dashed #c6e2ff;
  background-color: #ecf5ff;
  color: #409EFF;
}
.xt-photo-btn-icon {
  font-size: 30px;
  line-height: 80px;
}
</style>
<style>
.xt-table .el-table .cell .xt-photo {
  line-height: normal;
}
.xt-table .el-table td.el-table__cell .xt-photo div {
  box-sizing: initial;
}
</style>
