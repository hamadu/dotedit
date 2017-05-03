<template>
  <div id="palette">
    <select>
      <option>Default</option>
      <option>GB</option>
      <option>Mono</option>
    </select>

    <br/>

    <template v-for="(color, index) in colorMap.colors">
      <button class="palette"
        v-bind:class="{ selected: colorMap.selectedIndex == index }"
        v-bind:style="{
          background: color.hex
        }"
        v-on:click="selectColor(index)" />
    </template>

    <br/>

    <input class="color-component" type="text" name="R" />/
    <input class="color-component" type="text" name="G" />/
    <input class="color-component" type="text" name="B" />
    <button>Change Color</button>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: ['colorMap'],
  methods: {
    selectColor: function(id) {
      this.$emit('selectColor', id);
    }
  }
}
</script>

<style lang="scss">
input.color-component {
  width: 32px;
}

button.palette {
  outline: none;
  border: 1px solid #000;
  width: 64px;
  height: 24px;
}

button.palette.selected {
  border: 3px solid #000;
  font-weight: bold;
}
</style>
