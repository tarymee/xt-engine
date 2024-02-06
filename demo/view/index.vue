<template>
  <div v-if="!protocol" style="padding: 12px">
    <div v-for="(item, index) in demoArr" :key="index" style="display: inline-block;margin: 5px">
      <el-button type="primary" size="mini" @click="jump(item)">{{ item }}</el-button>
    </div>
  </div>
  <xt-engine v-else :protocol="protocol" />
</template>

<script>
export default {
  data: function () {
    return {
      demoArr: [
        'form',
        'table',
        'list',
        'foreach',
        'tabboard',
        'popview',
        'layout',
        'radio',
        'attachment',
        'webview',
        'tags',
        'eventflycode',
        'customervisitconfig',
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
        }).catch((err) => {
          this.protocol = null
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
