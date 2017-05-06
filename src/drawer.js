import Geometry from './geometry'

export default class Drawer {
  constructor(size, dots) {
    this.size = size;
    this.dots = dots;
    this.mode = 'none';
    this.fx = this.fy = this.tx = this.ty = this.lastX = this.lastY = 0;
  }

  down(mode, y, x, color) {
    this.mode = mode;
    this.fy = y;
    this.fx = x;
    this.ty = y;
    this.tx = x;
    this.lastY = y;
    this.lastX = x;
    this.color = color;

    switch (this.mode) {
      case 'dot':
        this.dot(y, x);
        break;
    }
  }

  move(oldDots, y, x) {
    this.tx = x;
    this.ty = y;

    if (this.mode !== 'dot') {
      if (this.lastY != y || this.lastX != x) {
        this.dots.splice(0, oldDots.length, ...oldDots);
      }
    }

    switch (this.mode) {
      case 'dot':
        this.line(this.lastY, this.lastX, y, x);
        break;
      case 'line':
        this.line(this.fy, this.fx, y, x);
        break;
      case 'rect':
        this.rect(this.fy, this.fx, y, x);
        break;
      case 'oval':
        this.oval(this.fy, this.fx, y, x);
        break;
    }
    this.lastY = y;
    this.lastX = x;
  }

  up(y, x) {
    switch (this.mode) {
      case 'line':
        this.line(this.fy, this.fx, y, x);
        break;
      case 'rect':
        this.rect(this.fy, this.fx, y, x);
        break;
      case 'oval':
        this.oval(this.fy, this.fx, y, x);
        break;
    }
    this.mode = 'none';
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
