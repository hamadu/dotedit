export default class Oval {
  constructor() {
    this.name = 'Oval'
    this.options = {};
  }

  down(drawer, y, x, color) {
    this.oldDots = drawer.dots.slice();
    this.startY = y;
    this.startX = x;
    this.lastY = y;
    this.lastX = x;
    this.color = color;
  }

  move(drawer, y, x) {
    if (this.lastY != y || this.lastX != x) {
      drawer.dots.splice(0, this.oldDots.length, ...this.oldDots);
    }
    this.lastY = y;
    this.lastX = x;
    drawer.oval(this.startY, this.startX, y, x, this.color);
  }

  up(drawer, y, x) {
    drawer.oval(this.startY, this.startX, y, x, this.color);
  }
}
