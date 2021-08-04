<template>
  <div class="app-container">
    <header-bar />
    <div class="app-content">
      <div class="app-menu">
        <left-menu />
      </div>
      <div class="app-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import headerBar from './headerBar.vue'
  import leftMenu from './leftMenu.vue'
  export default {
    components: {
      headerBar,
      leftMenu
    },
    created: function () {
      Vue.http.headers.common['token'] = localStorage.getItem('token')
    }
  }
</script>

<style scoped>

</style>
