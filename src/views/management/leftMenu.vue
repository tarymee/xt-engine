<template>
  <!-- <el-menu :unique-opened="true" :default-active="active" @select="goToPage" background-color="#32323A" text-color="#aeb2b7" active-text-color="#409EFF">
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>租户管理</span>
      </template>
      <el-menu-item index="1-1">租户管理(企业)</el-menu-item>
      <el-menu-item index="1-2">租户管理（产品开发）</el-menu-item>
      <el-menu-item index="1-3">租户账号管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="2-1">开发人员管理</el-menu-item>
      <el-menu-item index="2-2">角色管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template #title>
        <span>资源管理</span>
      </template>
      <el-menu-item index="3-1">资源配置</el-menu-item>
      <el-menu-item index="3-2">套餐配置</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template #title>
        <span>版本管理</span>
      </template>
      <el-menu-item index="4-1">行业版本</el-menu-item>
      <el-menu-item index="4-2">租户版本</el-menu-item>
      <el-menu-item index="4-3">租户账号版本</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template #title>
        <span>多平台配置</span>
      </template>
      <el-menu-item index="5-1">租户环境管理</el-menu-item>
      <el-menu-item index="5-2">环境列表管理</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template #title>
        <span>客户端升级控制</span>
      </template>
      <el-menu-item index="6-1">客户端版本管理</el-menu-item>
      <el-menu-item index="6-2">租户升级管理</el-menu-item>
      <el-menu-item index="6-3">账号升级管理</el-menu-item>
    </el-submenu>
  </el-menu> -->
  <el-menu
    background-color="#32323A"
    text-color="#aeb2b7"
    active-text-color="#409EFF"
    :unique-opened="true"
    :default-active="active"
    @select="goToPage"
  >
    <template v-for="(item, index) in menuData">
      <el-submenu
        v-if="item.children && item.children.length"
        :key="index"
        :index="index + ''"
      >
        <template #title>
          <i :class="[item.icon]"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(item2, index2) in item.children"
          :key="index2"
          :index="item2.url"
        >
          {{ item2.title }}
        </el-menu-item>
      </el-submenu>

      <el-menu-item
        v-if="!item.children"
        :key="index"
        :index="item.url"
      >
        <i :class="[item.icon]"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
  export default {
    data: function () {
      return {
        active: '',
        menuData: [
          {
            title: '租户管理',
            icon: 'el-icon-menu',
            children: [
              {
                title: '租户管理(企业)',
                url: '/management/enterprise'
              },
              {
                title: '租户管理(产品开发)',
                url: '/management/productdev'
              }
            ]
          },
          {
            title: '行政区域地图',
            icon: 'el-icon-map-location',
            url: '/management/regionmap'
          }
        ]
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler (to, from) {
          console.log('watch route', to, from)
          this.active = to.fullPath
        }
      }
    },
    methods: {
      goToPage (data) {
        if (this.active === data) return
        // console.log(data)
        this.$router.push(data)
      }
    }
  }
</script>
