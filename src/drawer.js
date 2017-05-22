import Geometry from './geometry'

export default class Drawer {
  constructor(size, dots) {
    this.size = size;
    this.dots = dots;
  }

  indexInDot(y, x) {
    return y * this.size + x;
  }

  syringe(y, x) {
    return this.dots[this.indexInDot(y, x)];
  }

  dot(y, x, color) {
    const idx = this.indexInDot(y, x);
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

  fillRect(fy, fx, ty, tx, color) {
    const row = [];
    const minX = Math.min(fx, tx);
    const maxX = Math.max(fx, tx);
    for (let x = minX ; x <= maxX ; x++) {
      row.push(color);
    }
    const minY = Math.min(fy, ty);
    const maxY = Math.max(fy, ty);
    for (let y = minY ; y <= maxY ; y++) {
      this.dots.splice(y * this.size + minX, row.length, ...row);
    }
  }

  bucket(y, x, color) {
    const DX = [0, 1, 0, -1];
    const DY = [1, 0, -1, 0];

    const fromColor = this.syringe(y, x);
    const queue = [[y, x]];
    let qhead = 0;
    while (qhead < queue.length) {
      const now = queue[qhead++];
      for (let d = 0 ; d < 4 ; d++) {
        const ty = now[0] + DY[d];
        const tx = now[1] + DX[d];
        if (ty < 0 || tx < 0 || ty >= this.size || tx >= this.size) {
          continue;
        }
        if (this.syringe(ty, tx) != fromColor) {
          continue;
        }
        this.dot(ty, tx, color);
        queue.push([ty, tx]);
      }
    }
  }
}
