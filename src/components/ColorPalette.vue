<template>
  <div id="palette">
    <template v-for="(color, index) in colorMap">
      <button v-bind:class="{ selected: currentColor == index }" v-on:click="selectColor(index)">{{color}}</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: ['colorMap', 'currentColor'],
  methods: {
    selectColor: function(id) {
      this.$emit('selectColor', id);
    }
  }
}
</script>

<style lang="scss">
.selected {
  font-weight: bold;
}
</style>
