import Geometry from './geometry'

export default class Drawer {
  constructor(canvas) {
    this.setCanvas(canvas);
  }

  setCanvas(canvas) {
    this.width = canvas.width
    this.height = canvas.height
    this.dots = canvas.dots
    this.selectDots = canvas.selectDots
    this.falseDots = new Array(this.height * this.width).fill(false)
  }

  indexInDot(y, x) {
    return y * this.width + x;
  }

  clearSelection() {
    this.selectDots.splice(0, this.selectDots.length, ...this.falseDots);
  }

  select(fy, fx, ty, tx) {
    Geometry.fillRect(fy, fx, ty, tx).forEach(dot => {
      this.selectDot(dot[0], dot[1])
    })
  }

  moveByDiff(baseDots, baseSelection, dy, dx) {
    for (let y = 0 ; y < this.height ; y++) {
      for (let x = 0 ; x < this.width ; x++) {
        const idx = y * this.width + x
        if (baseSelection[idx]) {
          this.dot(y, x, 0);
        }
      }
    }

    for (let y = 0 ; y < this.height ; y++) {
      for (let x = 0 ; x < this.width ; x++) {
        const refY = y - dy
        const refX = x - dx
        const idx = refY * this.width + refX
        const select = refY >= 0 && refY < this.height && refX >= 0 && refX < this.width && baseSelection[idx]
        this.selectDot(y, x, select)
        if (select) {
          this.dot(y, x, baseDots[idx])
        }
      }
    }
  }

  isSelected(y, x) {
    return this.selectDots[this.indexInDot(y, x)]
  }

  syringe(y, x) {
    return this.dots[this.indexInDot(y, x)]
  }

  dot(y, x, color) {
    const idx = this.indexInDot(y, x)
    if (this.dots[idx] != color) {
      this.dots.splice(idx, 1, color)
    }
  }

  selectDot(y, x, select = true) {
    const idx = this.indexInDot(y, x)
    this.selectDots.splice(idx, 1, select)
  }

  line(fy, fx, ty, tx, color) {
    Geometry.line(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color)
    })
  }

  oval(fy, fx, ty, tx, color) {
    Geometry.oval(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color)
    })
  }

  rect(fy, fx, ty, tx, color) {
    Geometry.rect(fy, fx, ty, tx).forEach(dot => {
      this.dot(dot[0], dot[1], color)
    })
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
      this.dots.splice(y * this.width + minX, row.length, ...row);
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
        if (ty < 0 || tx < 0 || ty >= this.width || tx >= this.width) {
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
