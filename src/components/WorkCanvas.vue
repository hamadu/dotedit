<template>
  <div id="work-canvas">
    <svg :width="dotsize * width" :height="dotsize * height" v-bind:style="{
      position: 'absolute'
    }">
      <rect :width="dotsize * (1 + Math.abs(drawer.fx - drawer.tx))" :height="dotsize * (1 + Math.abs(drawer.fy - drawer.ty))" v-bind:style="{
        x: dotsize * Math.min(drawer.fx, drawer.tx) + 'px',
        y: dotsize * Math.min(drawer.fy, drawer.ty) + 'px',
        fill: colorMap[drawer.color],
        strokeWidth: 3 + 'px',
        stroke: '#000'
      }" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'work-canvas',
  props: ['colorMap', 'dotsize', 'width', 'height', 'drawer']
}
</script>
