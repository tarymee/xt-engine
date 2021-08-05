<template>
  <xt-page
    :protocol="protocol"
  />
</template>

<script>
import protocol from './protocol.json'
import { components } from '@xwchina/smart100-web-engine'

export default {
  components: {
    'xt-page': components.page
  },
  data: function () {
    return {
      protocol: protocol,
    }
  }
}
</script>
