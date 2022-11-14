<template>
<div class="menu">
  <div class="menu__items">
    <div v-for="item in items"
         :key="item.value"
         class="menu__item"
         :class="{
           menu__item_active: item.value === activeItem.value
         }"
         @click="$emit('select', item)"
    >{{ item.title }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "MenuBlock",
  props: {
    items: Array,
    activeItem: Object,
  }
}
</script>

<style lang="scss" scoped>
.menu {
  &__items {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid white;
    padding: 2px;
  }

  &__item {
    padding: 2px;
    text-align: center;
    width: 100%;
    border: 1px solid white;
    opacity: .5;

    &_active {
      opacity: 1;
    }
  }
}
</style>
