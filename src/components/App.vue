<template>
  <div id="app" style="width: 100%;">
    <color-palette
      v-on:selectColor="selectColor"
      v-on:changeColor="changeColor"
      v-on:changeColorSet="changeColorSet"
      :color-map="colorMap" />

    <tool-box v-on:selectTool="selectTool" :current-tool="currentTool" />

    <scale-adjuster :magnify="magnify" v-on:scaleUp="scaleUp" v-on:scaleDown="scaleDown" />

    <div style="position: relative; top: 32px;">
      <dot-canvas ref="dotCanvas"
        :dotsize="magnify"
        :width="512 / magnify"
        :height="512 / magnify"
        :offset-y="offsetY"
        :offset-x="offsetX"
        :dots="dots"
        :color-map="colorMap"
      />

      <capture-canvas
        :dotsize="magnify"
        :width="512 / magnify"
        :height="512 / magnify"
        :offset-y="offsetY"
        :offset-x="offsetX"
        v-on:down="down"
        v-on:move="move"
        v-on:up="up" />
    </div>

    <div style="position: relative; top: 32px; left: 640px;">
      <preview-canvas ref="previewCanvas"
        :width="size"
        :height="size"
        :offset-y="offsetY"
        :offset-x="offsetX"
        :window-size="512 / magnify"
        :dots="dots"
        :color-map="colorMap"
        v-on:changeOffset="changeOffset"
      />
    </div>
  </div>
</template>

<script>
import Drawer from './../drawer'
import ColorMap from './../model/color/colorMap'

import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
import ScaleAdjuster from './ScaleAdjuster.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'
import PreviewCanvas from './PreviewCanvas.vue'
import WorkCanvas from './WorkCanvas.vue'

const colorMap = new ColorMap();

const size = 64;
const dots = [];
for (let i = 0 ; i < size ; i++) {
  for (let j = 0 ; j < size ; j++) {
    dots.push(0);
  }
}

const offsetY = 0;
const offsetX = 0;
const magnify = 16;

const drawer = new Drawer(size, dots);

const histories = [];

const data = {
  offsetY,
  offsetX,
  dots,
  histories,
  size,
  colorMap,
  drawer,
  magnify,
  push: false,
  currentColor: 1,
  currentTool: 0
};

export default {
  name: 'app',
  data: () => {
    return data
  },

  methods: {
    selectColor: function(id) {
      data.colorMap.selectColor(id);
    },

    changeColor: function(r, g, b) {
      data.colorMap.changeColor(data.colorMap.selectedIndex, r, g, b);
    },

    changeColorSet: function(name) {
      data.colorMap.changeColorSet(name);
    },

    selectTool: (id) => {
      data.currentTool = id;
    },

    scaleUp: function() {
      this.magnify = Math.min(32, this.magnify << 1);
    },

    scaleDown: function() {
      this.magnify = Math.max(8, this.magnify >>> 1);
    },

    changeOffset: function(y, x) {
      this.offsetY = y;
      this.offsetX = x;
    },

    down: function(y, x) {
      this.histories.push(this.dots.slice());

      const currentColor = data.colorMap.selectedIndex;
      switch (data.currentTool) {
        case 0:
          const idx = y * data.size + x;
          data.drawer.down('dot', y, x, data.dots[idx] === currentColor ? 0 : currentColor);
          break;
        case 1:
          data.drawer.down('line', y, x, currentColor);
          break;
        case 2:
          data.drawer.down('rect', y, x, currentColor);
          break;
        case 3:
          data.drawer.down('oval', y, x, currentColor);
          break;
      }
    },

    move: function(y, x) {
      data.drawer.move(this.histories[0], y, x);
    },

    up: function(y, x) {
      data.drawer.up(y, x);
      this.histories = [];
    }
  },
  components: {
    ColorPalette, ToolBox, DotCanvas, CaptureCanvas, PreviewCanvas, WorkCanvas, ScaleAdjuster
  }
}
</script>

<style lang="scss">
#app {

}
</style>
