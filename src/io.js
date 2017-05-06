export default class IO {
  static saveToURL(canvas) {
    const url = canvas.toDataURL();
    window.open(url);
  }

  static loadFromFile(file, callback) {
    const size = 64;
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log("ev", event);
      const img = new Image();
      img.onload = () => {
        const dots = [];
        for (let i = 0 ; i < size ; i++) {
          for (let j = 0 ; j < size ; j++) {
            dots.push(Math.random() < 0.5 ? 1 : 0);
          }
        }
        callback(dots);
        // var previewCanvas = Painter.Canvas.getPreviewCanvas();
        // previewCanvas.clearRect();
        // previewCanvas.loadImage(img);
        // Painter.Canvas.setScale(8);
        // Painter.Canvas.clip();
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
}
