export default class Rect {
  constructor() {
    this.name = 'Rect'
    this.options = { mode: '' }
  }

  toggle() {
    if (this.options.mode === '') {
      this.name = '*Rect*'
      this.options.mode = 'fill'
    } else {
      this.name = 'Rect'
      this.options.mode = ''
    }
  }

  down(drawer, y, x, color) {
    this.oldDots = drawer.dots.slice()
    this.startY = y
    this.startX = x
    this.lastY = y
    this.lastX = x
    this.color = color
  }

  move(drawer, y, x) {
    if (this.lastY != y || this.lastX != x) {
      drawer.dots.splice(0, this.oldDots.length, ...this.oldDots)
    }
    this.lastY = y
    this.lastX = x
    if (this.options.mode === 'fill') {
      drawer.fillRect(this.startY, this.startX, y, x, this.color)
    } else {
      drawer.rect(this.startY, this.startX, y, x, this.color)
    }
  }

  up(drawer, y, x) {
    if (this.options.mode === 'fill') {
      drawer.fillRect(this.startY, this.startX, y, x, this.color)
    } else {
      drawer.rect(this.startY, this.startX, y, x, this.color)
    }
  }
}
