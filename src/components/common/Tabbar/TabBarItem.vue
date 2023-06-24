<template>
      <div class="tab-bar-item" @click="itemClick">
          <div :class="{active:isActive}">
            <slot name="item-text" ></slot>
            <slot name="item-img" v-if="!(isActive)"></slot>
             <slot name="item-img-active" v-else></slot>
          </div>
      </div>
</template>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.active {
  color: red;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  computed: {
    isActive() {
      return !(this.$route.path.indexOf(this.path));
      //（this.$route）当前活跃的路由的路径是否包含传进来的路由路径
    }
  },
  data() {
    return {
      // isActive: false
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>
