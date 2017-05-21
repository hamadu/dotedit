export default class Bucket {
  constructor() {
    this.name = 'Bucket'
    this.options = {};
  }

  down(drawer, y, x, color) {
    this.color = color;
  }

  move(drawer, y, x) {
  }

  up(drawer, y, x) {
    drawer.bucket(y, x, this.color);
  }
}
