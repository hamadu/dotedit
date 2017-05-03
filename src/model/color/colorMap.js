import Color from './color'

export default class ColorMap {
  constructor() {
    this.colorSets = ['default', 'gameboy', 'gray'];
    this.colors = ColorMap.default();
    this.selectedIndex = 0;
  }

  changeColorSet(colorSet) {
    let colors = ColorMap.default();
    switch (colorSet) {
      case 'gameboy':
        colors = ColorMap.gameboy();
        break;
      case 'gray':
        colors = ColorMap.gray();
        break;
    }
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
    return ['#336699', '#000000', '#ff3333', '#33ff33', '#3333ff', '#888888', '#ffffff'].map(color => Color.fromHEX(color));
  }

  static gameboy() {
    return ['#999999', '#0F380F', '#306230', '#8bac0f', '#9bbc0f', '#ffffff', '#ffffff'].map(color => Color.fromHEX(color));
  }

  static gray() {
    return ['#336699', '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'].map(color => Color.fromHEX(color));
  }
}
