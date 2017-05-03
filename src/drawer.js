import Geometry from './geometry'

export default class Drawer {
  constructor(size, dots) {
    this.size = size;
    this.dots = dots;
  }

  down(mode, y, x, color) {
    this.mode = mode;
    this.fx = x;
    this.fy = y;
    this.tx = x;
    this.ty = y;
    this.color = color;

    switch (this.mode) {
      case 'dot':
        this.dot(y, x);
        break;
    }
  }

  move(y, x) {
    this.tx = x;
    this.ty = y;

    switch (this.mode) {
      case 'dot':
        this.dot(y, x);
        break;
    }
  }

  up(y, x) {
    switch (this.mode) {
      case 'oval':
        break;
      case 'line':
        this.line();
        break;
      case 'rect':
        this.fillRect();
        break;
    }
    this.mode = 'none';
  }

  dot(y, x) {
    const idx = y * this.size + x;
    this.dots.splice(idx, 1, this.color);
  }

  line() {
    Geometry.lineToDots(this.fy, this.fx, this.ty, this.tx).forEach(dot => {
      this.dot(dot[0], dot[1]);
    });
  }

  fillRect() {
    const row = [];
    for (let x = this.fx ; x <= this.tx ; x++) {
      row.push(this.color);
    }
    for (let y = this.fy ; y <= this.ty ; y++) {
      this.dots.splice(y * this.size + this.fx, row.length, ...row);
    }
  }

  static line(fx, fy, tx, ty) {
    return [[fx, fy], [tx, ty]];
  }

  static oval(fx, fy, tx, ty) {
    return [[fx, fy], [tx, fy], [fx, ty], [tx, ty]];
  }
}
