import Geometry from './geometry'

export default class Drawer {
  constructor(size, dots) {
    this.size = size;
    this.dots = dots;
  }

  dot(y, x, color) {
    const idx = y * this.size + x;
    if (this.dots[idx] != color) {
      this.dots.splice(idx, 1, color);
    }
  }

  line(fy, fx, ty, tx, color) {
    Geometry.line(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color);
    });
  }

  oval(fy, fx, ty, tx, color) {
    Geometry.oval(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color);
    });
  }

  rect(fy, fx, ty, tx, color) {
    Geometry.rect(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color);
    });
  }

  fillRect(fy, fx, ty, tx) {
    const row = [];
    const minX = Math.min(fx, tx);
    const maxX = Math.max(fx, tx);
    for (let x = minX ; x <= maxX ; x++) {
      row.push(this.color);
    }
    const minY = Math.min(fy, ty);
    const maxY = Math.max(fy, ty);
    for (let y = minY ; y <= maxY ; y++) {
      this.dots.splice(y * this.size + minX, row.length, ...row);
    }
  }
}
