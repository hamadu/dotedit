<template>
  <div id="canvas" class="container">
    <div v-if="displayingPrompt">
      <canvas-size-dialog
        :width="currentCanvas.width"
        :height="currentCanvas.height"
        v-on:ok="onOK"
        v-on:cancel="onCancel" />
    </div>

    <div style="position: relative; top: 16px;">
      <div class="btn-group">
        <template v-for="(canvas, index) in canvasManager.canvases">
          <button class="btn btn-sm" v-bind:class="{ active: currentCanvas == canvas }" v-on:click="selectCanvas(canvas)">{{index}}</button>
        </template>
      </div>
      <button class="btn btn-sm" v-on:click="addCanvas()">+</button>
      <button class="btn btn-sm" v-on:click="changeCanvasSize()">...</button>
    </div>

    <div class="dot" style="position: relative; top: 32px;">
      <dot-canvas ref="dotCanvas"
        :canvasWidth="currentCanvas.width"
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
import ScaleAdjuster from './ScaleAdjuster.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'

import CanvasSizeDialog from './CanvasSizeDialog.vue'

const data = {
  cursorX: 0,
  cursorY: 0,
  push: false,
  displayingPrompt: false
};

export default {
  name: 'draw-canvas',
  props: ['canvasManager', 'colorMap', 'toolSet'],
  data: () => {
    return data
  },
  computed: {
    currentCanvas: function() {
      return this.canvasManager.currentCanvas;
    },
    drawer: function() {
      return this.canvasManager.drawer;
    },
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
    changeCanvasSize: function() {
      this.displayingPrompt = true
    },

    onOK: function(newHeight, newWidth) {
      this.displayingPrompt = false
      this.canvasManager.setCanvasSize(newHeight, newWidth)
    },

    onCancel: function() {
      this.displayingPrompt = false
    },

    addCanvas: function() {
      this.canvasManager.setCanvas(this.canvasManager.addCanvas())
    },

    selectCanvas: function(canvas) {
      this.canvasManager.setCanvas(canvas)
    },

    pickColor: function() {
      const colorIndex = this.drawer.syringe(this.cursorY, this.cursorX)
      this.colorMap.selectColor(colorIndex)
    },

    down: function(y, x) {
      console.log(this.drawer)
      this.toolSet.currentTool.down(this.drawer, y, x, this.colorMap.selectedColorIndex)
    },

    rightDown: function(y, x) {
      const colorIndex = this.drawer.syringe(y, x)
      this.colorMap.selectColor(colorIndex)
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
    DotCanvas, CaptureCanvas, ScaleAdjuster, CanvasSizeDialog
  }
}
</script>
