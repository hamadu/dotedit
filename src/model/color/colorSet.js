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
    const colors = [Color.fromHEX('#336699')];
    for (let pad = 0 ; pad < 24 ; pad++) {
      colors.push(Color.fromRGB(0, 0, 0));
    }

    for (let hue = 0 ; hue < 360 ; hue += 30) {
      for (let value = 255 ; value >= 51 ; value -= 51) {
        for (let saturation = 255 ; saturation >= 51 ; saturation -= 51) {
          colors.push(Color.fromHSV(hue, saturation, value));
        }
      }
    }
    for (let gray = 25 ; gray >= 1 ; gray--) {
      colors.push(Color.fromRGB(gray * 10 + 5, gray * 10 + 5, gray * 10 + 5));
    }
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
