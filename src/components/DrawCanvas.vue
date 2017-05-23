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

const drawer = new Drawer(64, CanvasManager.getInstance().currentDots());

const data = {
  cursorX: 0,
  cursorY: 0,
  drawer,
  push: false,
};

export default {
  name: 'draw-canvas',
  props: ['canvasManager', 'colorMap', 'toolSet'],
  data: () => {
    return data
  },
  computed: {
    dots: function() {
      return this.canvasManager.currentDots();
    },
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
        this.toolSet.currentTool.move(this.drawer, y, x)
      }
      this.cursorX = x
      this.cursorY = y
    },

    up: function(y, x) {
      this.toolSet.currentTool.up(this.drawer, y, x)
      this.canvasManager.pushToHistory(this.dots.slice(0))
    }
  },

  components: {
    DotCanvas, CaptureCanvas, ScaleAdjuster
  }
}
</script>