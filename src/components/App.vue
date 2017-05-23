<template>
  <div id="app" style="width: 100%;">
    <div id="header">
      <i-o-tool v-on:save="save" v-on:loadFromFile="loadFromFile" />

      <tool-box :tool-set="toolSet" />

      <scale-adjuster :canvasState="canvasState" />

      <color-palette :color-map="colorMap" />
    </div>

    <div id="main">
      <div class="dot"  style="position: relative; top: 32px;">
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

      <preview-canvas ref="previewCanvas"
        :width="size"
        :height="size"
        :offset-y="offsetY"
        :offset-x="offsetX"
        :window-size="512 / canvasState.magnify"
        :dots="dots"
        :color-map="colorMap"
        v-on:changeOffset="changeOffset"
      />

      <!-- <div class="info" style="position: relative; top: 128px; left: 640px;">
        <cursor-info
          :y="cursorY"
          :x="cursorX"
          :dots="dots"
          :color-map="colorMap"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import Drawer from './../drawer'
import ColorMap from './../model/color/colorMap'
import ToolSet from './../model/tool/toolSet'
import CanvasState from './../model/canvasState'
import DotHistory from './../model/dotHistory'
import IO from './../io'

import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
import ScaleAdjuster from './ScaleAdjuster.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'
import PreviewCanvas from './PreviewCanvas.vue'
import CursorInfo from './CursorInfo.vue'
import IOTool from './IOTool.vue'

const size = 64;
const dots = [];
for (let i = 0 ; i < size ; i++) {
  for (let j = 0 ; j < size ; j++) {
    dots.push(0);
  }
}

const drawer = new Drawer(size, dots);

const data = {
  cursorX: 0,
  cursorY: 0,
  offsetY: 0,
  offsetX: 0,
  dots,
  size,
  dotHistory: new DotHistory(dots),
  canvasState: CanvasState.getInstance(),
  colorMap: new ColorMap(),
  toolSet: ToolSet.getInstance(),
  drawer,
  push: false
};

export default {
  name: 'app',
  data: () => {
    return data
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
    ColorPalette, IOTool, ToolBox, DotCanvas, CaptureCanvas, PreviewCanvas, ScaleAdjuster, CursorInfo
  }
}
</script>

<style lang="scss">
#app {
  user-select: none;
}
</style>
