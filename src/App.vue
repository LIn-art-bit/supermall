<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
   <main-tab-bar ></main-tab-bar>
  </div>
</template>
<style>
@import url(./assets/CSS/base.css);
</style>
<script>
import MainTabBar from "./components/comtent/MainTabBar.vue"
export default {
  name: "App",
  components: {
    MainTabBar
  },
}
</script>

