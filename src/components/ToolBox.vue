<template>
  <div id="toolbox">
    <template v-for="(tool, index) in toolSet.tools">
      <button v-bind:class="{ selected: toolSet.currentTool == tool }" v-on:click="selectTool(tool)">{{tool.name}}</button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'tool-box',
  props: ['toolSet'],
  methods: {
    selectTool: function(tool) {
      this.toolSet.selectTool(tool)
    }
  }
}
</script>

<style lang="scss">
.selected {
  font-weight: bold;
}
</style>
