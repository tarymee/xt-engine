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

import test from './test.js'

import layout from './layout.js'
import form from './form.js'
import table from './table.js'
import radio from './radio.js'
import list from './list.js'
import attachment from './attachment.js'
import tabboard from './tabboard.js'
import foreach from './foreach.js'
import webview from './webview.js'
import eventflycode from './eventflycode.js'

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
    dealProtocol () {
      const key = this.$route.query.protocol
      this.protocol = null
      setTimeout(() => {
        if (key === 'table') {
          this.protocol = table
        } else if (key === 'radio') {
          this.protocol = radio
        } else if (key === 'list') {
          this.protocol = list
        } else if (key === 'attachment') {
          this.protocol = attachment
        } else if (key === 'tabboard') {
          this.protocol = tabboard
        } else if (key === 'foreach') {
          this.protocol = foreach
        } else if (key === 'layout') {
          this.protocol = layout
        } else if (key === 'form') {
          this.protocol = form
        } else if (key === 'webview') {
          this.protocol = webview
        } else if (key === 'eventflycode') {
          this.protocol = eventflycode
        } else if (key === 'test') {
          this.protocol = test
        }
      }, 0)
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
