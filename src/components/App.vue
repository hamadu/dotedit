<template>
  <div id="app" style="width: 100%;">
    <color-palette
      v-on:selectColor="selectColor"
      v-on:changeColor="changeColor"
      v-on:changeColorSet="changeColorSet"
      :color-map="colorMap" />

    <tool-box v-on:selectTool="selectTool" :current-tool="currentTool" />

    <div style="position: relative; top: 32px;">
      <dot-canvas ref="dotCanvas" dotsize="8" :width="size" :height="size" :offset-x="0" :offset-y="0" :dots="dots" :color-map="colorMap" />

      <work-canvas dotsize="8" :width="size" :height="size" :color-map="colorMap" :drawer="drawer" />

      <capture-canvas dotsize="8" :width="size" :height="size" v-on:down="down" v-on:move="move" v-on:up="up" />
    </div>

    <div style="position: relative; top: 32px; left: 640px;">
      <preview-canvas ref="previewCanvas" dotsize="1" :width="size" :height="size" :dots="dots" :color-map="colorMap" />
    </div>
  </div>
</template>

<script>
import Drawer from './../drawer'
import ColorMap from './../model/color/colorMap'

import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
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
      data.colorMap.selectColor(id);
    },

    changeColor: (r, g, b) => {
      data.colorMap.changeColor(data.colorMap.selectedIndex, r, g, b);
    },

    changeColorSet: (name) => {
      data.colorMap.changeColorSet(name);
    },

    selectTool: (id) => {
      data.currentTool = id;
    },

    down: function(y, x) {
      // this.$refs.dotCanvas.drawRect(1, 2, 3, 4, '#996633');

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
      }
      this.$refs.dotCanvas.update(this.dots, this.colorMap);

    },

    move: function(y, x) {
      data.drawer.move(y, x);
      this.$refs.dotCanvas.update(this.dots, this.colorMap);
    },

    up: function(y, x) {
      data.drawer.up(y, x);
      this.$refs.dotCanvas.update(this.dots, this.colorMap);
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
