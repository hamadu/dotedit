<template>
  <div id="io">
    <button v-on:click="onSaveButtonClick">Save</button>
    <input type="file" value="Load" v-on:change="onLoadButtonClick"></input>
  </div>
</template>

<script>
export default {
  name: 'i-o-tool',
  methods: {
    onSaveButtonClick: function(event) {
      this.$emit('save');
    },
    onLoadButtonClick: function(event) {
      const files = event.target.files;
      if (files.length == 1) {
        this.$emit('loadFromFile', files[0]);
      }
    }
  }
}
</script>
