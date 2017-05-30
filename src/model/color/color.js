export default class Color {
  constructor(r, g, b) {
    this.r = Math.floor(r)
    this.g = Math.floor(g)
    this.b = Math.floor(b)
    this.hex = Color.rgbToHEX(this.r, this.g, this.b)
  }

  inverse() {
    return new Color(255-this.r, 255-this.g, 255-this.b)
  }

  static intToHex(color) {
    const hex = color.toString(16);
    return hex.length <= 1 ? ('0' + hex) : hex;
  }

  static fromHSV(h, s, v) {
    const max = v;
    const min = (max - (s / 255.0) * max);
    const med = (60 - Math.abs(h % 120 - 60)) / 60.0 * (max - min) + min;

    let r, g, b;
    if (0 <= h && h < 60) {
      r = max; g = med; b = min;
    } else if (h < 120) {
      r = med; g = max; b = min;
    } else if (h < 180) {
      r = min; g = max; b = med;
    } else if (h < 240) {
      r = min; g = med; b = max;
    } else if (h < 300) {
      r = med; g = min; b = max;
    } else {
      r = max; g = min; b = med;
    }
    return this.fromRGB(r, g, b);
  }

  static fromHEX(hex) {
    return new Color(...Color.hexToRGB(hex));
  }

  static fromRGB(r, g, b) {
    return new Color(r, g, b);
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
