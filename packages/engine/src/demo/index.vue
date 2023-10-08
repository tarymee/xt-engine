<template>
  <div v-if="!protocol" style="padding: 12px">
    <el-button v-for="(item, index) in demoArr" :key="index" type="primary" size="mini" @click="jump(item)">{{ item }}</el-button>
  </div>
  <xt-page
    v-else
    :protocol="protocol"
  />
</template>

<script>
import components from '../components/index.js'
export default {
  components: {
    'xt-page': components.page
  },
  data: function () {
    return {
      demoArr: [
        'table',
        'radio',
        'list',
        'attachment',
        'tabboard',
        'foreach',
        'layout',
        'form',
        'webview',
        'eventflycode',
        'test',
      ],
      protocol: null
    }
  },
  watch: {
    '$route.query.protocol' (newValue, oldValue) {
      // console.log(newValue, oldValue)
      this.dealProtocol()
    }
  },
  created () {
    this.dealProtocol()
  },
  methods: {
    async dealProtocol () {
      // const loadModuleFun = () => import('./eventflycode.js')
      // const moduleRes = await loadModuleFun()
      // console.log(loadModuleFun)
      // console.log(moduleRes)
      // console.log(moduleRes.default)
      // debugger
      const key = this.$route.query.protocol
      this.protocol = null
      if (key) {
        import(`./${key}.js`).then((res) => {
          this.protocol = res.default
        })
      }
    },
    jump (item) {
      // console.log(item)
      // console.log(this.$route)
      // console.log(this.$router)
      this.$router.push(`/?protocol=${item}`)
    }
  }
}
</script>
