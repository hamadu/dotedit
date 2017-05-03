import Color from './color'

export default class ColorMap {
  constructor() {
    this.colors = ColorMap.default().map(color => Color.fromHEX(color));
    this.selectedIndex = 0;
  }

  changeColorSet(colors) {
    this.colors = colors;
  }

  color(idx) {
    return this.colors[idx].hex;
  }

  currentColor() {
    return this.colors[this.selectedIndex];
  }

  selectColor(idx) {
    this.selectedIndex = idx;
  }

  changeColor(idx, r, g, b) {
    this.colors.splice(idx, 1, Color.fromRGB(r, g, b));
  }

  static default() {
    return ['#336699', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffffff'];
  }

  static gameboy() {
    return ['#999999', '#0F380F', '#306230', '#8bac0f', '#9bbc0f'];
  }

  static gray() {
    return ['#369', '#000', '#333', '#666', '#999', '#ccc', '#fff'];
  }
}
