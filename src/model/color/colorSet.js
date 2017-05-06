import Color from './color'

export default class ColorSet {
  constructor(name, colors) {
    this.name = name;
    this.colors = colors;
  }

  static fromColors(name, colors) {
    return new ColorSet(name, colors);
  }

  static default() {
    const colors = ['#336699', '#000000', '#ff3333', '#33ff33', '#3333ff', '#888888', '#ffffff'].map(color => Color.fromHEX(color));
    return this.fromColors('default', colors);
  }

  static gameboy() {
    const colors = ['#999999', '#0F380F', '#306230', '#8bac0f', '#9bbc0f', '#ffffff', '#ffffff'].map(color => Color.fromHEX(color));
    return this.fromColors('gameboy', colors);
  }

  static gray() {
    const colors = ['#336699', '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'].map(color => Color.fromHEX(color));
    return this.fromColors('gray', colors);
  }
}
