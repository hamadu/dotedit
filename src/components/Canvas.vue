<template>
  <div id="canvas">
    <div class="dot" style="position: relative; top: 32px;">
      <dot-canvas ref="dotCanvas"
        :dotsize="canvasState.magnify"
        :width="512 / canvasState.magnify"
        :height="512 / canvasState.magnify"
        :offset-y="offsetY"
        :offset-x="offsetX"
        :dots="dots"
        :color-map="colorMap"
      />

      <capture-canvas
        :dotsize="canvasState.magnify"
        :width="512 / canvasState.magnify"
        :height="512 / canvasState.magnify"
        :offset-y="offsetY"
        :offset-x="offsetX"
        v-on:down="down"
        v-on:rightDown="rightDown"
        v-on:move="move"
        v-on:up="up" />
    </div>
  </div>
</template>

<script>
import Drawer from './../drawer'
import CanvasManager from './../model/canvas/canvasManager'

import ScaleAdjuster from './ScaleAdjuster.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'

const drawer = new Drawer(size, dots);

const data = {
  cursorX: 0,
  cursorY: 0,
  canvasManager: CanvasManager.getInstance(),
  drawer,
  push: false,
};

export default {
  name: 'canvas',
  props: ['colorMap', 'toolSet'],
  data: () => {
    return data
  },
  computed: {
    canvasState: function() {
      return this.canvasManager.currentState();
    },
    offsetX: function() {
      return this.canvasManager.currentState().offsetX;
    },
    offsetY: function() {
      return this.canvasManager.currentState().offsetY;
    }
  },
  methods: {
    save: function() {
      IO.saveToURL(this.$refs.previewCanvas.$refs.previewCanvas);
    },

    loadFromFile: function(file) {
      const canvas = this.$refs.previewCanvas.$refs.previewCanvas;
      IO.loadFromFile(file, canvas, (dots, colorSet) => {
        this.colorMap.addColorSet(colorSet);
        this.dots.splice(0, dots.length, ...dots);
      });
    },

    undo: function() {
      const len = this.dots.length
      this.dots.splice(0, len, ...this.dotHistory.prev())
    },

    redo: function() {
      const len = this.dots.length
      this.dots.splice(0, len, ...this.dotHistory.next())
    },

    changeOffset: function(y, x) {
      this.offsetY = y
      this.offsetX = x
    },

    pickColor: function() {
      const colorIndex = this.drawer.syringe(this.cursorY, this.cursorX);
      this.colorMap.selectColor(colorIndex);
    },

    down: function(y, x) {
      this.toolSet.currentTool.down(this.drawer, y, x, this.colorMap.selectedColorIndex);
    },

    rightDown: function(y, x) {
      const colorIndex = this.drawer.syringe(y, x);
      this.colorMap.selectColor(colorIndex);
    },

    move: function(y, x, pushed) {
      if (pushed) {
        this.toolSet.currentTool.move(this.drawer, y, x);
      }
      this.cursorX = x;
      this.cursorY = y;
    },

    up: function(y, x) {
      this.toolSet.currentTool.up(this.drawer, y, x);
      this.dotHistory.push(this.dots.slice(0));
    }
  },

  components: {
    DotCanvas, CaptureCanvas, ScaleAdjuster
  }
}
</script>
