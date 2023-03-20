<template>
  <xt-page
    :protocol="protocol"
  />
</template>

<script>
import { components } from '@smart100/web-engine'

import radio from './radio.js'
import table from './table.js'
import smartcenter from './smartcenter.js'
import attachment from './attachment.js'
import tabboard from './tabboard.js'

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
    if (protocol === 'table') {
      this.protocol = table
    } else if (protocol === 'radio') {
      this.protocol = radio
    } else if (protocol === 'smartcenter') {
      this.protocol = smartcenter
    } else if (protocol === 'attachment') {
      this.protocol = attachment
    } else if (protocol === 'tabboard') {
      this.protocol = tabboard
    }
  }
}
</script>
