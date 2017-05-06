export default class Pencil {
  constructor() {
    this.name = 'Pencil'
    this.options = {};
  }

  down(drawer, y, x, color) {
    const idx = y * Math.sqrt(drawer.dots.length) + x;
    this.lastX = x;
    this.lastY = y;
    this.color = drawer.dots[idx] === color ? 0 : color;
    drawer.dot(y, x, this.color);
  }

  move(drawer, y, x) {
    drawer.line(this.lastY, this.lastX, y, x, this.color);
    this.lastY = y;
    this.lastX = x;
  }

  up(drawer, y, x) {
  }
}
