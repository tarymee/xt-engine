<template>
  <div
    class="xt-input"
    :class="[$parent.customClass, ('xt-' + $parent.type), { 'xt-input-intable': $parent.intable }]"
    :style="[$parent.viewStyle]"
  >
    <div
      v-if="!$parent.infilter && !$parent.intable && $parent.titlewidth !== '0px' && $parent.titlewidth !== '0%' && $parent.titlewidth !== '0'"
      class="xt-input-label"
      :style="{ width: $parent.titlewidth }"
    >
      <span v-if="$parent.required">*</span>{{ $parent.title }}
    </div>
    <div class="xt-input-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'xt-inputwrapper'
}
</script>

<style scoped>

</style>
