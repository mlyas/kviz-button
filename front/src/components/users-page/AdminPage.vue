<template>
<div class="admin-page">
  <div class="admin-page__title">ADMIN</div>
  <menu-block class="admin-page__menu" :items="menuItems" :active-item="activeItem" @select="onSelect"/>
  <div v-if="activeItem.value === 'registration'" class="admin-page__list">
    <div class="admin-page__controls">
      <div class="admin-page__switch-holder">
        Регистрация : ON <bool-switch
        class="admin-page__switch"
        :is-active="prop.isRegistrationActive"
        @toggle="$emit('updateIsRegistrationActive', $event)"
      /> OFF

      </div>
      <div class="admin-page__clear" @click="$emit('clearAll')">Очистить</div>
    </div>
    <div
        v-for="(item, index) in prop.userList"
        :key="item.uuid"
        class="admin-page__item"
    >
      <div class="admin-page__item-index">{{index + 1}}.</div>
      <div class="admin-page__item-title">{{ item.teamTitle }}</div>
    </div>
  </div>
</div>
</template>

<script>
import { adminMenuItems } from "@/libs/models";
import MenuBlock from "@/components/ui-kit/MenuBlock"
import BoolSwitch from "@/components/ui-kit/BoolSwitch";

export default {
  name: "AdminPage",
  components: {BoolSwitch, MenuBlock },
  props: {
    prop: Object,
  },
  data() {
    return {
      menuItems: adminMenuItems,
      activeItem: adminMenuItems[0]
    }
  },
  mounted() {
    this.$emit('init')
  },
  methods: {
    onSelect(e) {
      this.activeItem = e
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-page {
  text-align: center;

  &__menu {
    margin-top: 1rem;
  }

  &__list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  &__item {
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px 10px;
  }

  &__switch-holder {
    display: flex;
  }

  &__switch {
    margin: 0 10px;
  }

  &__delete {
    height: 20px;
    svg {
      height: 100%;
      display: block;
    }
  }

  &__controls {
    gap: 2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: .5rem;
  }

  &__clear {
    text-decoration: underline;
  }
}
</style>
