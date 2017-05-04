<template>
  <div class="preview-canvas">
    <!-- <template v-for="(color, index) in dots">
      <div v-bind:style="{
        position: 'absolute',
        top: (Math.floor(index / width) * dotsize) + 'px',
        left: ((index % width) * dotsize) + 'px',
        width: dotsize + 'px',
        height: dotsize + 'px',
        background: colorMap.color(color)}">
      </div>
    </template> -->
    <canvas ref="previewCanvas"
      :width="dotsize * width"
      :height="dotsize * height"
      v-bind:style="{
        position: 'absolute'
      }"
    >
    </canvas>

    <div v-bind:style="{
      position: 'absolute',
      border: '1px dotted #000',
      width: (dotsize * width) + 'px',
      height: (dotsize * width) + 'px'}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height'],
  methods: {
    update: function(dots, colorMap) {
      const ctx = this.$refs.previewCanvas.getContext('2d');
      for (var y = 0 ; y < this.height ; y++) {
        for (var x = 0 ; x < this.width ; x++) {
          ctx.fillStyle = colorMap.color(dots[y*this.width+x]);
          ctx.fillRect(x * this.dotsize, y * this.dotsize, this.dotsize, this.dotsize);
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
