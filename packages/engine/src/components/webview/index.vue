<template>
  <div
    class="xt-webview"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <iframe v-if="value" frameborder="0" :src="value" @load="onload" />
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'
import { get } from 'lodash-es'

export default {
  name: 'xt-webview',
  mixins: [baseMixin],
  data () {
    return {
      contentWindow: null
    }
  },
  methods: {
    setValue (value, setter) {
      if (value !== this.value) {
        this.contentWindow = null
        this.value = ''
        setTimeout(() => {
          this.value = value
        }, 0)
      }
    },
    onload (e) {
      // console.log(e)
      const iframe = get(e, 'path[0]') || get(e, 'target')
      // console.log(iframe)
      if (iframe) {
        this.contentWindow = iframe.contentWindow
        // iframe.contentWindow.aaa = 'aaa'
      }
      this.executeEvent('onload')
    }
  }
}
</script>

<style scoped>
.xt-webview {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.xt-webview iframe {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
