<template>
  <draggable title="Color Palette" x="540" y="200">
    <div id="palette">
      <select ref="colorSet" v-on:change="changeColorSet">
        <template v-for="(colorSet, index) in colorMap.colorSets">
          <option :value="index">{{colorSet.name}}</option>
        </template>
      </select>

      <br/>

      <template v-for="(color, index) in colorMap.colors()">
        <button class="palette"
          v-bind:class="{ selected: colorMap.selectedColorIndex == index }"
          v-bind:style="{
            background: color.hex
          }"
          v-on:click="selectColor(index)" />
      </template>

      <br/>

      <ColorPicker :r="colorMap.currentColor().r" :g="colorMap.currentColor().g" :b="colorMap.currentColor().b" v-on:changeColor="applyColor" />
    </div>
  </draggable>
</template>

<script>
import Draggable from './Draggable.vue'
import ColorPicker from './ColorPicker.vue'

export default {
  name: 'color-palette',
  props: ['colorMap'],
  methods: {
    changeColorSet: function() {
      const colorSetIndex = this.$refs.colorSet.value;
      this.colorMap.changeColorSet(this.colorMap.colorSets[colorSetIndex]);
    },

    selectColor: function(id) {
      this.colorMap.selectColor(id);
    },

    applyColor: function(r, g, b) {
      this.colorMap.changeColor(this.colorMap.selectedColorIndex, r, g, b);
    },

    changeColor: function() {
      const r = parseInt(this.$refs.r.value) || 0;
      const g = parseInt(this.$refs.g.value) || 0;
      const b = parseInt(this.$refs.b.value) || 0;
    }
  },
  components: { Draggable, ColorPicker }
}

</script>

<style lang="scss" scoped>
div#palette {
  width: 600px;
  z-index: 1;
}

input.color-component {
  width: 32px;
}

button.palette {
  outline: none;
  border: 1px solid #000;
  width: 24px;
  height: 16px;
}

button.palette.selected {
  border: 3px solid #000;
  font-weight: bold;
}
</style>
