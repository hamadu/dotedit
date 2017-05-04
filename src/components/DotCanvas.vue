<template>
  <div id="canvas">
    <canvas ref="dotCanvas"
      :width="dotsize * width"
      :height="dotsize * height"
      v-bind:style="{
        border: '2px solid #000',
        position: 'absolute'
      }"
    >
    </canvas>

    <canvas ref="gridCanvas"
      :width="dotsize * width"
      :height="dotsize * height"
      v-bind:style="{
        border: '2px solid #000',
        position: 'absolute'
      }"
    >
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'dot-canvas',
  props: ['dots', 'colorMap', 'dotsize', 'width', 'height', 'offsetX', 'offsetY'],
  mounted: function() {
    this.drawGrid();
    this.update();
  },
  watch: {
    dotsize: function() {
      this.drawGrid();
      this.update();
    },

    'colorMap.colors': function() {
      this.update();
    },

    dots: function() {
      this.update();
    },

    offsetX: function() {
      this.update();
    },

    offsetY: function() {
      this.update();
    }
  },
  methods: {
    drawRect: function(fy, fx, h, w, color) {
      const ctx = this.$refs.dotCanvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(fx * this.dotsize, fy * this.dotsize, w * this.dotsize, h * this.dotsize);
    },
    update: function() {
      const len = Math.sqrt(this.dots.length);
      const ctx = this.$refs.dotCanvas.getContext('2d');
      for (var y = 0 ; y < this.height ; y++) {
        for (var x = 0 ; x < this.width ; x++) {
          const ay = y + this.offsetY;
          const ax = x + this.offsetX;
          ctx.fillStyle = this.colorMap.color(this.dots[ay*len+ax]);
          ctx.fillRect(x * this.dotsize, y * this.dotsize, this.dotsize, this.dotsize);
        }
      }
    },
    drawGrid: function() {
      const gridCanvas = this.$refs.gridCanvas;
      const ctx = gridCanvas.getContext('2d');
      ctx.clearRect(0, 0, this.height * this.dotsize, this.width * this.dotsize);
      ctx.strokeStyle = 'rgba(127, 127, 127, 0.5)';
      for (var y = 0 ; y < this.height ; y++) {
        for (var x = 0 ; x < this.width ; x++) {
          ctx.beginPath();

          // holizontal
          ctx.moveTo(x * this.dotsize, y * this.dotsize);
          ctx.lineTo(x * this.dotsize + (this.dotsize - 1), y * this.dotsize);

          // vertical
          ctx.moveTo(x * this.dotsize, y * this.dotsize);
          ctx.lineTo(x * this.dotsize, y * this.dotsize + (this.dotsize - 1));

          ctx.stroke();
        }
      }
    }
  }
}
</script>
