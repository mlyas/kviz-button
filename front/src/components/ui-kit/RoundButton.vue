<template>
  <div
      class="round-button" :class="{ 'round-button_disabled': disabled }"
      :style="{ width: `${size}px`, height: `${size}px` }"
      @click="$emit('action')"
  ></div>
</template>

<script>
export default {
  name: "RoundButton",
  props: {
    size: Number,
    disabled: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.round-button {
  border-radius: 50%;
  border: 1px solid black;
  min-width: 10px;
  min-height: 10px;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;

  &:active:before {
    background-color: #09b250;
  }

  &:before {
    content: '';
    position: absolute;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
    background-color: #00D359;
    border-radius: 50%;
    transition: background-color .3s;
  }

  &_disabled {
    pointer-events: none;
    &:before {
      background-color: rgba(16, 24, 40, 0.25);
    }
  }
}
</style>
