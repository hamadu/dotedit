<template>
  <div class="preview-canvas">
    <div
      v-on:mousedown="down"
      v-on:mousemove="move"
      v-on:mouseup="up"
      v-on:mouseleave="leave"
      v-bind:style="{
        zIndex: 1,
        position: 'absolute',
        left: offsetX + 'px',
        top: offsetY + 'px',
        width: windowSize + 'px',
        height: windowSize + 'px',
        border: '1px solid #f00'
      }"
    />

    <canvas ref="previewCanvas"
      :width="width"
      :height="height"
      v-bind:style="{
        border: '1px dashed #000',
        position: 'absolute'
      }"
    >
    </canvas>

  </div>
</template>

<script>
export default {
  name: 'preview-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height', 'offsetX', 'offsetY', 'windowSize'],
  data: () => {
    return { push: false }
  },
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
    getNewOffset: function(event) {
      const x = Math.max(0, Math.min(this.width-this.windowSize, this.offsetX + event.offsetX - (this.windowSize >> 1)));
      const y = Math.max(0, Math.min(this.height-this.windowSize, this.offsetY + event.offsetY - (this.windowSize >> 1)));
      return [y, x];
    },

    down: function(event) {
      const yx = this.getNewOffset(event);
      this.push = true;
      this.$emit('changeOffset', yx[0], yx[1]);
    },

    move: function(event) {
      if (this.push) {
        const yx = this.getNewOffset(event);
        this.$emit('changeOffset', yx[0], yx[1]);
      }
    },

    up: function(event) {
      const yx = this.getNewOffset(event);
      this.push = false;
      this.$emit('changeOffset', yx[0], yx[1]);
    },

    leave: function(event) {
      this.push = false;
    },

    update: function() {
      const ctx = this.$refs.previewCanvas.getContext('2d');
      for (var y = 0 ; y < this.height ; y++) {
        for (var x = 0 ; x < this.width ; x++) {
          const color = this.dots[y*this.width+x];
          if (color >= 1) {
            ctx.fillStyle = this.colorMap.color(this.dots[y*this.width+x]);
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
</style>
