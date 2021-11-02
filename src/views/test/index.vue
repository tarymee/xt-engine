<template>
  <xt-page
    :protocol="protocol"
  />
</template>

<script>
import { components } from '@xwchina/smart100-web-engine'
import protocol from './protocol.js'

export default {
  components: {
    'xt-page': components.page
  },
  data: function () {
    return {
      protocol: protocol
    }
  }
}
</script>
