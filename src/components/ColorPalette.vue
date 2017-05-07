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

      <div>
        R:<input type="range" min="0" max="255" ref="r" v-on:input="changeColor()" :value="colorMap.currentColor().r" /> {{colorMap.currentColor().r}}<br/>
        G:<input type="range" min="0" max="255" ref="g" v-on:input="changeColor()" :value="colorMap.currentColor().g" /> {{colorMap.currentColor().g}}<br/>
        B:<input type="range" min="0" max="255" ref="b" v-on:input="changeColor()" :value="colorMap.currentColor().b" /> {{colorMap.currentColor().b}}<br/>
      </div>
    </div>
  </draggable>
</template>

<script>
import Draggable from './Draggable.vue'

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

    changeColor: function() {
      const r = parseInt(this.$refs.r.value) || 0;
      const g = parseInt(this.$refs.g.value) || 0;
      const b = parseInt(this.$refs.b.value) || 0;
      this.colorMap.changeColor(this.colorMap.selectedColorIndex, r, g, b);
    }
  },
  components: { Draggable }
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
