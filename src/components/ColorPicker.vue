<template>
  <div id="picker">
    <div class="container">
      <div class="columns">
        <div class="col-7">
          <div class="container">
            <div class="columns">
              <div class="col-6">
                R:
                <input type="range" min="0" max="255" ref="r1" v-on:input="changeColorRange()" :value="r" />
              </div>
              <div class="col-6">
                <div class="input-group">
                  <input class="form-input input-sm" type="number" min="0" max="255" ref="r2" v-on:input="changeColorNumber()" :value="r" />
                  <button class="btn btn-sm" v-on:click="addR(-15)">-15</button>
                  <button class="btn btn-sm" v-on:click="addR(15)">+15</button>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="columns">
              <div class="col-6">
                G:
                <input type="range" min="0" max="255" ref="g1" v-on:input="changeColorRange()" :value="g" />
              </div>
              <div class="col-6">
                <div class="input-group">
                  <input class="form-input input-sm" type="number" min="0" max="255" ref="g2" v-on:input="changeColorNumber()" :value="g" />
                  <button class="btn btn-sm" v-on:click="addG(-15)">-15</button>
                  <button class="btn btn-sm" v-on:click="addG(15)">+15</button>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="columns">
              <div class="col-6">
                B:
                <input type="range" min="0" max="255" ref="b1" v-on:input="changeColorRange()" :value="b" />
              </div>
              <div class="col-6">
                <div class="input-group">
                  <input class="form-input input-sm" type="number" min="0" max="255" ref="b2" v-on:input="changeColorNumber()" :value="b" />
                  <button class="btn btn-sm" v-on:click="addB(-15)">-15</button>
                  <button class="btn btn-sm" v-on:click="addB(15)">+15</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1">
          <div
            v-bind:style="{
              marginLeft: '16px',
              border: '2px solid #000',
              width: '48px',
              height: '48px',
              background: `rgb(${r}, ${g}, ${b})`
            }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: ['r', 'g', 'b'],
  methods: {
    changeColorSet: function() {
      const colorSetIndex = this.$refs.colorSet.value;
      this.colorMap.changeColorSet(this.colorMap.colorSets[colorSetIndex]);
    },

    selectColor: function(id) {
      this.colorMap.selectColor(id);
    },

    changeColorRange: function() {
      const r = parseInt(this.$refs.r1.value) || 0;
      const g = parseInt(this.$refs.g1.value) || 0;
      const b = parseInt(this.$refs.b1.value) || 0;
      this.changeColor(r, g, b);
    },

    changeColorNumber: function() {
      const r = parseInt(this.$refs.r2.value) || 0;
      const g = parseInt(this.$refs.g2.value) || 0;
      const b = parseInt(this.$refs.b2.value) || 0;
      this.changeColor(r, g, b);
    },

    addR: function(diff) {
      const r = this.adjustRange(this.r + diff)
      this.changeColor(r, this.g, this.b)
    },

    addG: function(diff) {
      const g = this.adjustRange(this.g + diff)
      this.changeColor(this.r, g, this.b)
    },

    addB: function(diff) {
      const b = this.adjustRange(this.b + diff)
      this.changeColor(this.r, this.g, b)
    },

    changeColor: function(r, g, b) {
      this.$emit('changeColor', this.adjustRange(r), this.adjustRange(g), this.adjustRange(b))
    },

    adjustRange(value) {
      return Math.max(0, Math.min(255, value));
    }
  }
}

</script>

<style lang="scss" scoped>
div#picker {
  margin-top: 8px;
}

input.color-component {
  width: 32px;
}

button.palette {
  outline: none;
  border: 1px solid #000;
  width: 24px;
  height: 16px;
}

button.palette.selected {
  border: 3px solid #000;
  font-weight: bold;
}
</style>
