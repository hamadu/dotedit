import Color from './color'
import ColorSet from './colorSet'

export default class ColorMap {
  constructor() {
    this.colorSets = [ColorSet.default(), ColorSet.gameboy(), ColorSet.gray()];
    this.currentColorSet = ColorSet.default();
    this.selectedColorIndex = 0;
  }

  changeColorSet(colorSet) {
    this.currentColorSet = colorSet;
  }

  addColorSet(colorSet) {
    this.colorSets.push(colorSet)
    this.currentColorSet = colorSet
    this.selectedColorIndex = 0
  }

  colors() {
    return this.currentColorSet.colors
  }

  color(idx) {
    return this.currentColorSet.colors[idx].hex;
  }

  inverseColor(idx) {
    return this.currentColorSet.colors[idx].inverse().hex;
  }

  currentColor() {
    return this.currentColorSet.colors[this.selectedColorIndex];
  }

  selectColor(idx) {
    this.selectedColorIndex = idx;
  }

  changeColor(idx, r, g, b) {
    this.currentColorSet.colors.splice(idx, 1, Color.fromRGB(r, g, b));
  }
}
