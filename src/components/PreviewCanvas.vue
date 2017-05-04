<template>
  <div class="preview-canvas">
    <canvas ref="previewCanvas"
      :width="width"
      :height="height"
      v-on:click="previewClicked"
      v-bind:style="{
        border: '1px dashed #000',
        position: 'absolute'
      }"
    >
    </canvas>

    <div v-bind:style="{
      position: 'absolute',
      left: offsetX + 'px',
      top: offsetY + 'px',
      width: windowSize + 'px',
      height: windowSize + 'px',
      border: '1px solid #f00'
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'preview-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height', 'offsetX', 'offsetY', 'windowSize'],
  mounted: function() {
    this.update();
  },
  watch: {
    'colorMap.colors': function() {
      this.update();
    },

    dots: function(newColorMap) {
      this.update();
    }
  },
  methods: {
    previewClicked: function(event) {
      const x = Math.min(this.width-this.windowSize, event.offsetX);
      const y = Math.min(this.height-this.windowSize, event.offsetY);
      this.$emit('changeOffset', y, x);
    },

    update: function() {
      const ctx = this.$refs.previewCanvas.getContext('2d');
      for (var y = 0 ; y < this.height ; y++) {
        for (var x = 0 ; x < this.width ; x++) {
          ctx.fillStyle = this.colorMap.color(this.dots[y*this.width+x]);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
