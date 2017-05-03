export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.hex = Color.rgbToHEX(r, g, b);
  }

  static intToHex(color) {
    const hex = color.toString(16);
    return hex.length <= 1 ? ('0' + hex) : hex;
  }

  static fromHEX(hex) {
    return new Color(...Color.hexToRGB(hex));
  }

  static rgbToHEX(r, g, b) {
    return '#' + Color.intToHex(r) + Color.intToHex(g) + Color.intToHex(b);
  }

  static hexToRGB(hex) {
    const rgb = hex[0] == '#' ? hex.substr(1) : hex;
    const decimal = parseInt(rgb, 16);
    return [(decimal >> 16) & 255, (decimal >> 8) & 255, decimal & 255];
  }
}
