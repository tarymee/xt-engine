<template>
  <xt-page
    v-if="protocol"
    :protocol="protocol"
  />
</template>

<script>
import { components } from '@smart100/web-engine'

import radio from './radio.js'
import table from './table.js'
import list from './list.js'
import attachment from './attachment.js'
import tabboard from './tabboard.js'
import foreach from './foreach.js'

export default {
  components: {
    'xt-page': components.page
  },
  data: function () {
    return {
      protocol: null
    }
  },
  created () {
    const protocol = this.$route.query.protocol
    // console.log(protocol)
    if (!protocol) {
      console.error('请在链接添加 ?protocol=table')
    }
    if (protocol === 'table') {
      this.protocol = table
    } else if (protocol === 'radio') {
      this.protocol = radio
    } else if (protocol === 'list') {
      this.protocol = list
    } else if (protocol === 'attachment') {
      this.protocol = attachment
    } else if (protocol === 'tabboard') {
      this.protocol = tabboard
    } else if (protocol === 'foreach') {
      this.protocol = foreach
    } else {
      this.protocol = table
    }
  }
}
</script>
