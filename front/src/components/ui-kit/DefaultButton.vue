<template>
<div class="default-button" :class="classNames" :style="style" @click="$emit('action')">
  <slot v-if="!title"/>
  <span v-else>{{ title }}</span>
</div>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    title: String,
    size: Number,
    disabled: Boolean
  },
  computed: {
    style() {
      const style = {}
      if (this.size !== undefined) {
        style.width = `${this.size}px`
        style.height = `${this.size}px`
        style.borderRadius = '50%'
      }
      return style
    },
    classNames() {
      const classNames = {}
      if (this.disabled) classNames['default-button_disabled'] = true
      return classNames
    }
  }
}
</script>

<style lang="scss" scoped>
.default-button {
  background-color: #2F9AFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  border-radius: 10px;
  border: 1px solid black;
  box-sizing: border-box;
  color: white;
  cursor: pointer;

  &_disabled {
    background-color: rgba(16, 24, 40, 0.25);
    pointer-events: none;
  }

  &:active {
    background-color: #247bcb;
  }
}
</style>
