<template>
  <div class="user-page">
    <alan-title/>
    <led-indicator :mode="currentLampMode" @click="onclick"/>
    <alan-button :pressed="isButtonPressed" @press="isButtonPressed = true"/>
  </div>
</template>

<script>
import AlanButton from "@/components/ui-kit/AlanButton";
import AlanTitle from "@/components/ui-kit/AlanTitle";
import LedIndicator from "@/components/ui-kit/LedIndicator";

export default {
  name: "UserPage",
  components: {LedIndicator, AlanTitle, AlanButton },
  data() {
    return {
      isButtonPressed: false
    }
  },
  computed: {
    currentLampMode() {
      return 'white'
    }
  },
  methods: {
    onclick() {
      this.count++
    }
  }
}
</script>

<style lang="scss" scoped>
.user-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  &__button {
    margin-top: 150px;
  }
}
</style>
