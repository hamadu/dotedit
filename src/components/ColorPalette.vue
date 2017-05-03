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

    <input class="color-component" type="text" ref="r" :value="colorMap.currentColor().r" />/
    <input class="color-component" type="text" ref="g" :value="colorMap.currentColor().g" />/
    <input class="color-component" type="text" ref="b" :value="colorMap.currentColor().b" />
    <button v-on:click="changeColor()">Change Color</button>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: ['colorMap'],
  methods: {
    changeColorSet: function(value) {
    },

    selectColor: function(id) {
      this.$emit('selectColor', id);
    },

    changeColor: function() {
      const red   = parseInt(this.$refs.r.value) || 0;
      const green = parseInt(this.$refs.g.value) || 0;
      const blue  = parseInt(this.$refs.b.value) || 0;
      this.$emit('changeColor', red, green, blue);
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
