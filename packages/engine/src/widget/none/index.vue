<template>
  <div class="xt-widget-none">
    <i class="xt-widget-none-icon el-icon-document-copy" />
    <div class="xt-widget-none-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.xt-widget-none {
  width: 100%;
  height: 100px;
  text-align: center;
}
.xt-widget-none-icon {
  display: block!important;
  font-size: 80px;
  color: #ccc;
}
.xt-widget-none-text {
  font-size: 12px;
  line-height: 20px;
  color: #999;
  text-align: center;
}
</style>
