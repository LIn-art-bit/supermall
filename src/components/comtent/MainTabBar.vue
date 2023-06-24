<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item path="/home">
        <div slot="item-text">首页</div>
        <div slot="item-img">
          <img src="../../assets/img/tabbar/home.svg" >
        </div>
        <div slot="item-img-active">
          <img src="../../assets/img/tabbar/home_active.svg" >
        </div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <div slot="item-text" >分类</div>
        <div slot="item-img">
          <img src="../../assets/img/tabbar/category.svg" >
        </div>
         <div slot="item-img-active">
          <img src="../../assets/img/tabbar/category_active.svg" >
        </div>
      </tab-bar-item>
      <tab-bar-item  path="/cart">
        <div slot="item-text">购物车</div>
        <div slot="item-img">
          <img src="../../assets/img/tabbar/cart.svg" >
        </div>
         <div slot="item-img-active">
          <img src="../../assets/img/tabbar/cart_active.svg" >
        </div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <div slot="item-text" >我的</div>
        <div slot="item-img">
          <img src="../../assets/img/tabbar/profile.svg" >
        </div>
         <div slot="item-img-active">
          <img src="../../assets/img/tabbar/profile_active.svg" >
        </div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<style>
@import "../../assets/CSS/base.css";

</style>
<script>
import TabBar from "../common/Tabbar/TabBar.vue";
import TabBarItem from"../common/Tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
