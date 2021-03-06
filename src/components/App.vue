<template>
  <div id="app" style="width: 100%;">
    <div id="header">
      <i-o-tool v-on:save="save" v-on:loadFromFile="loadFromFile" />

      <tool-box :tool-set="toolSet" />

      <scale-adjuster :canvasState="canvasState" />

      <color-palette :color-map="colorMap" />
    </div>

    <div id="main">
      <draw-canvas
        :color-map="colorMap"
        :tool-set="toolSet"
        :canvas-manager="canvasManager" />

      <preview-canvas ref="previewCanvas"
        :width="width"
        :height="height"
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
import CanvasManager from './../model/canvas/canvasManager'
import ColorMap from './../model/color/colorMap'
import ToolSet from './../model/tool/toolSet'
import IO from './../io'

import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
import ScaleAdjuster from './ScaleAdjuster.vue'
import DrawCanvas from './DrawCanvas.vue'
import PreviewCanvas from './PreviewCanvas.vue'
import CursorInfo from './CursorInfo.vue'
import IOTool from './IOTool.vue'

import Electron from 'electron'

const data = {
  canvasManager: CanvasManager.getInstance(),
  colorMap: new ColorMap(),
  toolSet: ToolSet.getInstance()
};

export default {
  name: 'app',
  data: () => {
    return data
  },
  computed: {
    width: function() {
      return this.canvasManager.currentCanvas.width
    },
    height: function() {
      return this.canvasManager.currentCanvas.height
    },
    dots: function() {
      return this.canvasManager.currentDots()
    },
    canvasState: function() {
      return this.canvasManager.currentState()
    },
    offsetX: function() {
      return this.canvasManager.currentState().offsetX
    },
    offsetY: function() {
      return this.canvasManager.currentState().offsetY
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
      this.canvasManager.undo()
    },

    redo: function() {
      this.canvasManager.redo()
    },

    cut: function() {
      const selectedDots = this.canvasManager.currentCanvas.getSelectedDots()
      Electron.clipboard.writeText(JSON.stringify(selectedDots))
      this.canvasManager.deleteSelection()
    },

    copy: function() {
      const selectedDots = this.canvasManager.currentCanvas.getSelectedDots()
      Electron.clipboard.writeText(JSON.stringify(selectedDots))
    },

    paste: function() {
      try {
        const dots = JSON.parse(Electron.clipboard.readText())
        this.toolSet.selectToolByName('Select')
        const selectTool = this.toolSet.currentTool
        selectTool.selectFromPaste(this.canvasManager.drawer, dots)
        // selectFromPaste
      } catch (e) {
        console.error(e)
      }
    },

    deleteSelection: function() {
      this.canvasManager.deleteSelection()
    },

    selectAll: function() {
      this.canvasManager.selectAll()
    },

    changeOffset: function(y, x) {
      this.canvasManager.changeOffset(y, x)
    }
  },

  components: {
    ColorPalette, IOTool, ToolBox, DrawCanvas, PreviewCanvas, ScaleAdjuster, CursorInfo
  }
}
</script>

<style lang="scss" scoped>
#app {
  user-select: none;
}
</style>
