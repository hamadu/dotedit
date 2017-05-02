<template>
  <div id="canvas">
    <template v-for="(color, index) in dots">
      <div v-bind:style="{
        position: 'absolute',
        top: (Math.floor(index / width) * dotsize) + 'px',
        left: ((index % width) * dotsize) + 'px',
        width: dotsize + 'px',
        height: dotsize + 'px',
        background: colorMap[color]}">
      </div>
    </template>

    <div v-bind:style="{
      position: 'absolute',
      border: '1px solid #000',
      width: (dotsize * width) + 'px',
      height: (dotsize * width) + 'px'}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height']
}
</script>

<style lang="scss">
</style>
