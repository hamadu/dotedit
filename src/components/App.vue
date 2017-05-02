<template>
  <div id="app" style="width: 100%;">
    <color-palette v-on:selectColor="selectColor" :current-color="currentColor" :color-map="colorMap" />

    <tool-box v-on:selectTool="selectTool" :current-tool="currentTool" />

    <div style="position: relative; top: 32px;">
      <dot-canvas dotsize="16" :width="size" :height="size" :dots="dots" :color-map="colorMap" />

      <capture-canvas dotsize="16" :width="size" :height="size" v-on:dot="dot" />
    </div>

    <div style="position: relative; top: 32px; left: 640px;">
      <preview-canvas dotsize="1" :width="size" :height="size" :dots="dots" :color-map="colorMap" />
    </div>
  </div>
</template>

<script>
import ColorPalette from './ColorPalette.vue'
import ToolBox from './ToolBox.vue'
import DotCanvas from './DotCanvas.vue'
import CaptureCanvas from './CaptureCanvas.vue'
import PreviewCanvas from './PreviewCanvas.vue'

const colorMap = ['#fff', '#f00', '#0f0', '#00f'];

const size = 32;
const dots = [];
for (let i = 0 ; i < size ; i++) {
  for (let j = 0 ; j < size ; j++) {
    dots.push(0);
  }
}

const data = {
  dots: dots,
  size: 32,
  push: false,
  currentColor: 1,
  currentTool: 0,
  colorMap: colorMap
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

    dot:(y, x) => {
      const idx = y * data.size + x;
      data.dots.splice(idx, 1, data.currentColor);
    }
  },
  components: {
    ColorPalette, ToolBox, DotCanvas, CaptureCanvas, PreviewCanvas
  }
}
</script>

<style lang="scss">
#app {

}
</style>
