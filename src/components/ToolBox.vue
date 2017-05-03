<template>
  <div id="toolbox">
    <template v-for="(name, index) in tools">
      <button v-bind:class="{ selected: currentTool == index }" v-on:click="selectTool(index)">{{name}}</button>
    </template>
  </div>
</template>

<script>
const tools = ['Pencil', 'Line', 'Rect', 'Oval']

export default {
  name: 'tool-box',
  data: () => {
    return { tools }
  },
  props: ['currentTool'],
  methods: {
    selectTool: function(id) {
      this.$emit('selectTool', id);
    }
  }
}
</script>

<style lang="scss">
.selected {
  font-weight: bold;
}
</style>
