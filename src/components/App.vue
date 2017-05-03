<template>
  <div id="app" style="width: 100%;">
    <color-palette v-on:selectColor="selectColor" :current-color="currentColor" :color-map="colorMap" />

    <tool-box v-on:selectTool="selectTool" :current-tool="currentTool" />

    <div style="position: relative; top: 32px;">
      <dot-canvas dotsize="16" :width="size" :height="size" :dots="dots" :color-map="colorMap" />

      <work-canvas dotsize="16" :width="size" :height="size" :color-map="colorMap" :drawer="drawer" />

      <capture-canvas dotsize="16" :width="size" :height="size" v-on:down="down" v-on:move="move" v-on:up="up" />
    </div>

    <div style="position: relative; top: 32px; left: 640px;">
      <preview-canvas dotsize="1" :width="size" :height="size" :dots="dots" :color-map="colorMap" />
    </div>
  </div>
</template>

<script>
import Drawer from './../drawer'

import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'
import PreviewCanvas from './PreviewCanvas.vue'
import WorkCanvas from './WorkCanvas.vue'

const colorMap = ['#fff', '#f00', '#0f0', '#00f'];

const size = 16;
const dots = [];
for (let i = 0 ; i < size ; i++) {
  for (let j = 0 ; j < size ; j++) {
    dots.push(0);
  }
}

const drawer = new Drawer(size, dots);

const data = {
  dots,
  size,
  colorMap,
  drawer,
  push: false,
  currentColor: 1,
  currentTool: 0,
};

export default {
  name: 'app',
  data: () => {
    return data
  },
  methods: {
    selectColor: (id) => {
      data.currentColor = id;
    },

    selectTool: (id) => {
      data.currentTool = id;
    },

    down:(y, x) => {
      switch (data.currentTool) {
        case 0:
          const idx = y * data.size + x;
          data.drawer.down('dot', y, x, data.dots[idx] === data.currentColor ? 0 : data.currentColor);
          break;
        case 1:
          data.drawer.down('line', y, x, data.currentColor);
          break;
        case 2:
          data.drawer.down('rect', y, x, data.currentColor);
          break;
      }
    },

    move:(y, x) => {
      data.drawer.move(y, x);
    },

    up:(y, x) => {
      data.drawer.up(y, x);
    }
  },
  components: {
    ColorPalette, ToolBox, DotCanvas, CaptureCanvas, PreviewCanvas, WorkCanvas
  }
}
</script>

<style lang="scss">
#app {

}
</style>
