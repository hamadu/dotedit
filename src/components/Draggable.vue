<template>
  <div class="draggable"
    v-bind:style="{
      position: 'absolute',
      left: position[1] + 'px',
      top: position[0] + 'px'
    }">
    <div class="draggable-area" v-on:mousedown="down" v-on:mousemove="move" v-on:mouseup="up">{{title}}</div>
    <slot>nya-</slot>
  </div>
</template>

<script>
export default {
  name: 'draggable',
  props: ['x', 'y', 'title'],
  data: () => {
    return {
      position: [0, 0],
      offset: [0, 0],
      push: false
    }
  },
  methods: {
    mouseEventToPosition: function(event) {
      return [event.pageY, event.pageX];
    },

    down: function(event) {
      const buttonCode = event.button;
      const yx = this.mouseEventToPosition(event);
      if (buttonCode === 0) {
        this.offset = [yx[0] - this.position[0], yx[1] - this.position[1]];
        this.push = true;
      }
    },

    move: function(event) {
      const yx = this.mouseEventToPosition(event);
      if (this.push) {
        this.position = [yx[0] - this.offset[0], yx[1] - this.offset[1]];
      }
    },

    up: function(event) {
      this.push = false;
    }
  }
}
</script>

<style lang="scss" scoped>
div.draggable {
  border: 2px solid #000;
  background-color: #fff;
}

div.draggable-area {
  cursor: move;
  border-bottom: 2px solid #000;
  background-color: #ccc;
  height: 32px;
}
</style>
