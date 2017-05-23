export default class CanvasState {
  constructor() {
    this.magnify = 16;
    this.offsetY = 0;
    this.offsetX = 0;
  }

  scaleUp() {
    this.magnify = Math.min(32, this.magnify << 1);
  }

  scaleDown() {
    this.magnify = Math.max(8, this.magnify >>> 1);
  }
}
