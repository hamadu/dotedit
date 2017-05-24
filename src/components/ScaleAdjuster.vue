<template>
  <div id="scale-adjuster" class="container">
    <button class="btn btn-sm" v-on:click="scaleDown()">-</button>
    x{{canvasState.magnify}}
    <button class="btn btn-sm" v-on:click="scaleUp()">+</button>
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
