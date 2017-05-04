<template>
  <div class="scale-adjuster">
    <button v-on:click="scaleDown()">-</button>
    x{{magnify}}
    <button v-on:click="scaleUp()">+</button>
  </div>
</template>

<script>
export default {
  name: 'scale-adjuster',
  props: ['magnify'],
  methods: {
    scaleUp: function() {
      this.$emit('scaleUp');
    },
    scaleDown: function() {
      this.$emit('scaleDown');
    }
  }
}
</script>
