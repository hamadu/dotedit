<template>
  <div class="scale-adjuster">
    <button v-on:click="scaleDown()">-</button>
    x{{canvasState.magnify}}
    <button v-on:click="scaleUp()">+</button>
  </div>
</template>

<script>
export default {
  name: 'scale-adjuster',
  props: ['canvasState'],
  methods: {
    scaleUp: function() {
      this.canvasState.scaleUp();
    },
    scaleDown: function() {
      this.canvasState.scaleDown();
    }
  }
}
</script>
