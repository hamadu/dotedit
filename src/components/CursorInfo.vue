<template>
  <div id="cursor-info">
    <div class="info">(y, x) = ({{y}}, {{x}})</div>
    <div v-bind:style="{
      border:     '2px solid #000',
      background: color,
      width:      '16px',
      height:     '16px'
    }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'cursor-info',
  props: ['dots', 'colorMap', 'y', 'x'],
  computed: {
    colorID: function() {
      const len = Math.sqrt(this.dots.length);
      return this.dots[this.y * len + this.x];
    },
    color: function() {
      return this.colorMap.color(this.colorID);
    }
  }
}
</script>


<style lang="scss">
#cursor-info div.info {
  color: #666;
  font-size: 12px;
}
</style>
