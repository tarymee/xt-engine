<template>
  <div
    class="xt-webview"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <iframe v-if="value" frameborder="0" :src="value" @load="onload" />
    <xt-widget-none v-else />
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'
import { get } from 'lodash-es'

export default {
  name: 'xt-webview',
  components: {
    'xt-widget-none': () => import('../../widget/none')
  },
  mixins: [baseMixin],
  data () {
    return {
      contentWindow: null
    }
  },
  methods: {
    setValue (value, setter) {
      this.contentWindow = null
      this.value = ''
      setTimeout(() => {
        this.value = value
      }, 0)
    },
    onload (e) {
      // console.log(e)
      const iframe = get(e, 'path[0]') || get(e, 'target')
      // console.log(iframe)
      // console.log(iframe.contentWindow)
      if (iframe) {
        try {
          this.contentWindow = iframe.contentWindow
        } catch (err) {
          console.error(err)
        }
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
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.xt-webview iframe {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
