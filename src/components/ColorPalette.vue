<template>
  <div id="palette">
    <select ref="colorSet" v-on:change="changeColorSet">
      <template v-for="name in colorMap.colorSets">
        <option :value="name">{{name}}</option>
      </template>
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

    R:<input type="range" min="0" max="255" ref="r" v-on:input="changeColor()" :value="colorMap.currentColor().r" /> {{colorMap.currentColor().r}}<br/>
    G:<input type="range" min="0" max="255" ref="g" v-on:input="changeColor()" :value="colorMap.currentColor().g" /> {{colorMap.currentColor().g}}<br/>
    B:<input type="range" min="0" max="255" ref="b" v-on:input="changeColor()" :value="colorMap.currentColor().b" /> {{colorMap.currentColor().b}}<br/>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: ['colorMap'],
  methods: {
    changeColorSet: function() {
      const colorSetName = this.$refs.colorSet.value;
      this.$emit('changeColorSet', colorSetName);
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
