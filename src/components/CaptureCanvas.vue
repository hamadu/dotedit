<template>
  <div id="capture-canvas">
    <div v-on:mousedown="down" v-on:mousemove="move" v-on:mouseup="up" v-bind:style="{
        position: 'absolute',
        top:      '0px',
        left:     '0px',
        width:    dotsize * width + 'px',
        height:   dotsize * height + 'px'}">
    </div>
  </div>
</template>

<script>

export default {
  name: 'capture-canvas',
  data: () => {
    return { push: false }
  },
  props: ['dotsize', 'width', 'height', 'offsetX', 'offsetY'],
  methods: {
    mouseEventToPosition: function(event) {
      const x = Math.floor(event.offsetX / this.dotsize);
      const y = Math.floor(event.offsetY / this.dotsize);
      return [y + this.offsetY, x + this.offsetX];
    },

    down: function(event) {
      const buttonCode = event.button;
      const yx = this.mouseEventToPosition(event);
      if (buttonCode === 0) {
        this.push = true;
        this.$emit('down', yx[0], yx[1]);
      } else if (buttonCode === 2) {
        this.$emit('rightDown', yx[0], yx[1]);
      }
    },

    move: function(event) {
      const yx = this.mouseEventToPosition(event);
      this.$emit('move', yx[0], yx[1], this.push);
    },

    up: function(event) {
      const yx = this.mouseEventToPosition(event);
      this.push = false;
      this.$emit('up', yx[0], yx[1]);
    }
  }
}
</script>
