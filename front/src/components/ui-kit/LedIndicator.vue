<template>
  <div class="led-indicator" :class="{ [`led-indicator_${mode}`]: mode }">
    <div class="led-indicator__lamp"></div>
  </div>
</template>

<script>
export default {
  name: "LedIndicator",
  props: {
    mode: String,
  }
}
</script>

<style lang="scss" scoped>
.led-indicator {
  width: 30px;
  height: 30px;
  display: inline-block;

  &_red &__lamp {
    background-color: #F00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px 1px, inset #441313 0 0 9px, rgba(255, 0, 0, 0.5) 0 0 12px;
  }

  &_yellow &__lamp {
    background-color: #FF0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px 1px, inset #808002 0 0 9px, #FF0 0 0 12px;
  }

  &_white &__lamp {
    background-color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px 1px, inset #737373 0 0 9px, #FFF 0 0 12px;
  }

  &_green &__lamp {
    background-color: #ABFF00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px 1px, inset #304701 0 0 9px, #89FF00 0 0 12px;
  }

  &__lamp {
    margin: 0 auto;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #626262;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px 1px, inset #2c2c2c 0 0 4px, #626262 0 0 5px;
    transition: background-color .5s, box-shadow .5s;
  }
}
</style>
