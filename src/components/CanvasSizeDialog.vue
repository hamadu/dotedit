<template>
  <div class="modal active">
    <div class="modal-overlay"></div>
    <div class="modal-container col-4">
      <div class="modal-header">
        <button class="btn btn-clear float-right" v-on:click="onCancel()"></button>
        <div class="modal-title">Canvas Size</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <label class="form-label">Width(32~128):</label>
          <input class="form-input" type="number" min="16" max="128" ref="width" :value="width" /><br/>
          <label class="form-label">Height(32~128):</label>
          <input class="form-input" type="number" min="16" max="128" ref="height" :value="height" /><br/>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-link" v-on:click="onCancel()">Cancel</button>
        <button class="btn btn-primary" v-on:click="onOK()">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas-size-dialog',
  props: ['width', 'height'],
  methods: {
    onOK: function() {
      const width = this.$refs.width.value
      const height = this.$refs.height.value
      this.$emit('ok', height, width)
    },

    onCancel: function() {
      this.$emit('cancel')
    },
  }
}
</script>
