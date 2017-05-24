<template>
  <div id="toolbox" class="container">
    <div class="btn-group">
      <template v-for="(tool, index) in toolSet.tools">
        <button class="btn" v-bind:class="{ active: toolSet.currentTool == tool }" v-on:click="selectTool(tool)">{{tool.name}}</button>
      </template>
    </div>
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
#toolbox {
  padding: 8px;
}
.selected {
  font-weight: bold;
}
</style>
