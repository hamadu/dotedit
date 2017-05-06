import Color from './color'

export default class ColorSet {
  constructor(colors) {
    this.colors = colors;
  }

  static fromColors(colors) {
    return new ColorSet(colors);
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
