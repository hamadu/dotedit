import Color from './color'
import ColorSet from './colorSet'

export default class ColorMap {
  constructor() {
    this.colorSets = ['default', 'gameboy', 'gray'];
    this.colors = ColorSet.default();
    this.selectedIndex = 0;
  }

  changeColorSet(colorSet) {
    let colors = [];
    switch (colorSet) {
      case 'gameboy':
        colors = ColorSet.gameboy();
        break;
      case 'gray':
        colors = ColorSet.gray();
        break;

      case 'default':
        colors = ColorSet.default();
        break;
    }
    if (colors.length == 0) {
      colors = colorSet.colors;
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
}
