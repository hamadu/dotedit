import Color from './model/color/color'
import ColorSet from './model/color/colorSet'

export default class IO {
  static saveToURL(canvas) {
    const url = canvas.toDataURL();
    window.open(url);
  }

  static loadFromFile(file, canvas, callback) {
    const size = 64;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const colorIDMap = {};
        const dots = [];
        const colors = [Color.fromRGB(51, 102, 153)]

        for (let i = 0 ; i < size ; i++) {
          for (let j = 0 ; j < size ; j++) {
            const px = ctx.getImageData(j, i, 1, 1).data;
            if (px[3] == 0) {
              dots.push(0);
            } else {
              const color = Color.fromRGB(px[0], px[1], px[2]);
              if (!colorIDMap[color.hex]) {
                colorIDMap[color.hex] = colors.length;
                colors.push(color);
              }
              dots.push(colorIDMap[color.hex]);
            }
          }
        }

        while (colors.length <= 255) {
          colors.push(Color.fromRGB(0, 0, 0))
        }

        callback(dots, ColorSet.fromColors('file', colors))
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
}
