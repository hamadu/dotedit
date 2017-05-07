export default class Bucket {
  constructor() {
    this.name = 'Bucket'
    this.options = {};
  }

  down(drawer, y, x, color) {
  }

  move(drawer, y, x) {
  }

  up(drawer, y, x) {
    // doit
    // drawer.line(this.startY, this.startX, y, x, this.color);
  }
}
