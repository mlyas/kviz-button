<template>
<div class="overlay">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "OverlayBlock"
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
