// class CanvasUtil {
//   static copyDots(canvas, offsetY, offsetX, height, width, dotsize, dots, colorMap) {
//     const ctx = canvas.getContext('2d');
//     for (var y = 0 ; y < height ; y++) {
//       for (var x = 0 ; x < width ; x++) {
//         const ay = y + offsetY;
//         const ax = x + offsetX;
//         ctx.fillStyle = colorMap.color(dots[ay*len+ax]);
//         ctx.fillRect(x * dotsize, y * dotsize, dotsize, dotsize);
//       }
//     }
//   }
//
//   static drawGrid(canvas, height, width, dotsize) {
//     const gridCanvas = this.$refs.gridCanvas;
//     const ctx = gridCanvas.getContext('2d');
//     ctx.clearRect(0, 0, height * dotsize, width * dotsize);
//     ctx.strokeStyle = 'rgba(127, 127, 127, 0.5)';
//     for (var y = 0 ; y < height ; y++) {
//       for (var x = 0 ; x < width ; x++) {
//         ctx.beginPath();
//
//         // holizontal
//         ctx.moveTo(x * dotsize, y * dotsize);
//         ctx.lineTo(x * dotsize + (dotsize - 1), y * dotsize);
//
//         // vertical
//         ctx.moveTo(x * dotsize, y * dotsize);
//         ctx.lineTo(x * dotsize, y * dotsize + (dotsize - 1));
//
//         ctx.stroke();
//       }
//     }
//
//   }
// }
