<template>
  <div id="canvas">
    <template v-for="(color, index) in dots">
      <div v-bind:style="{
        border: '1px solid #000',
        position: 'absolute',
        top: (Math.floor(index / width) * dotsize) + 'px',
        left: ((index % width) * dotsize) + 'px',
        width: dotsize + 'px',
        height: dotsize + 'px',
        background: colorMap.color(color)}">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'dot-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height']
}
</script>
