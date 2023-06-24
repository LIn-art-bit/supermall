<template>
 <div id="tab-bar">
    <slot></slot>
 </div>
</template>
<style>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 4px rgba(100, 100, 100, 1);
}
</style>