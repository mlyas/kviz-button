<template>
  <div class="custom-input" :class="{ 'custom-input_disabled': disabled, 'custom-input_error': isError }">
    <span v-if="label" class="custom-input__label">{{ label }}</span>
    <div class="custom-input__input-holder">
      <input
          ref="input"
          class="custom-input__input"
          :placeholder="isError ? '' : placeholder"
          :value="innerValue"
          :type="type" :disabled="disabled"
          :style="{
            textAlign
          }"
          @focusout="isError = false"
          @input.stop="onInput"
          @keydown.enter="$emit('submit')"
      >
      <round-button
          v-if="actionButton"
          class="custom-input__action-button"
          :disabled="disabled || buttonDisabled"
          :size="20"
          @action="$emit('action')"
      ></round-button>
    </div>
  </div>
</template>

<script>
import RoundButton from "@/components/ui-kit/RoundButton";
import {cutSpacesFromBeginAndEnd} from "@/components/ui-kit/utils";
export default {
  name: "CustomInput",
  components: {RoundButton},
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    modelValue: String,
    textAlign: String,
    label: String,
    buttonDisabled: Boolean,
    actionButton: Boolean,
    disabled: Boolean,
    required: Boolean,
  },
  data() {
    return {
      innerValue: null,
      isError: false,
    }
  },
  methods: {
    onInput(e) {
      const _value = e.target.value
      const value = cutSpacesFromBeginAndEnd(_value)
      if (!value.length && _value.length) {
        this.$refs.input.value = value
      } else {
        this.$emit('update:modelValue', value)
      }
    }
  },
  watch: {
    modelValue(value) {
      this.innerValue = value
      this.isError = !value
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-input {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: .5rem;

  &_disabled {
    pointer-events: none;

    .custom-input__input-holder {
      background-color: rgba(128, 128, 128, 0.5);
    }

    .custom-input__label {
      opacity: .5;
    }
  }

  &_error {
    .custom-input__input-holder {
      background-color: rgba(225, 33, 68, 0.3);
      border-color: rgba(225, 33, 68, 1)
    }
  }

  &__input-holder {
    display: flex;
    align-items: center;
    gap: .5rem;
    border: 2px solid white;
    border-radius: 5px;
    padding: 5px;
  }

  &__input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: white;

    &:focus {
      outline: none;
    }
  }
}
</style>
