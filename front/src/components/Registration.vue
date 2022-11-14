<template>
<div class="registration">
  <overlay>
    <custom-input
        v-model="teamTitle"
        label="Название команды"
        action-button
        required
        placeholder="Введите название команды"
        text-align="center"
        :disabled="isDisabled"
        :button-disabled="isButtonDisabled"
        @action="submit"
        @submit="submit"
    />
  </overlay>
</div>
</template>

<script>
import Overlay from "@/components/ui-kit/Overlay";
import CustomInput from "@/components/ui-kit/CustomInput";
import {getTeamTitle} from "@/libs/utils";

export default {
  name: "RegistrationPage",
  components: { Overlay, CustomInput },
  props: {
    uuid: String,
  },
  data() {
    return {
      isDisabled: false,
      teamTitle: '',
    }
  },
  mounted() {
    const teamTitle = getTeamTitle()
    if (teamTitle) {
      this.isDisabled = true
      this.teamTitle = teamTitle
      this.$emit('registered', { teamTitle: this.teamTitle })
    }
  },
  computed: {
    isButtonDisabled() {
      return !this.teamTitle
    }
  },
  methods: {
    submit() {
      this.isDisabled = true
      this.$emit('registered', { teamTitle: this.teamTitle })
    }
  }
}
</script>

<style scoped>
.registration {
  position: relative;
}
</style>
