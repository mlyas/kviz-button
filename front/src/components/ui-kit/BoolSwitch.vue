<template>
<div class="switch" :class="{ 'switch_active': isActive }" @click="$emit('toggle', !isActive)">
  <div class="switch__button-holder">
    <div class="switch__button"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "BoolSwitch",
  props: {
    isActive: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.switch {
  &__button-holder {
    padding: 2px 10px;
    background-color: rgba(213, 203, 203, 0.4);
    border-radius: 9999px;
  }
  &_active &__button-holder {
    background-color: #89FF00;
  }


  &__button {
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    position: relative;
    left: -8px;
    transition: .3s left;
  }

  &_active &__button {
    left: 8px;
  }
}
</style>
