export default class Selector {
  constructor() {
    this.name = 'Select'
    this.mode = ''
    this.options = {}
    this.selectionChange = true
  }

  down(drawer, y, x, color) {
    this.mode = drawer.isSelected(y, x) ? 'move' : 'selection'
    if (this.mode === 'selection') {
      drawer.clearSelection()
    } else {
      if (this.selectionChange) {
        this.oldDots = drawer.dots.slice()
        this.oldSelectDots = drawer.selectDots.slice()
        this.selectionChange = false
        this.baseDiffY = 0
        this.baseDiffX = 0
      }
    }
    this.startY = y
    this.startX = x
    this.lastY = y
    this.lastX = x
  }

  move(drawer, y, x) {
    if (this.mode === 'selection') {
      if (this.lastY != y || this.lastX != x) {
        drawer.clearSelection()
      }
      drawer.select(this.startY, this.startX, y, x)
    } else {
      const dy = y - this.startY + this.baseDiffY
      const dx = x - this.startX + this.baseDiffX
      if (this.lastY != y || this.lastX != x) {
        drawer.dots.splice(0, this.oldDots.length, ...this.oldDots)
        drawer.moveByDiff(this.oldDots, this.oldSelectDots, dy, dx)
      }
    }
    this.lastY = y
    this.lastX = x
  }

  up(drawer, y, x) {
    if (this.mode === 'selection') {
      if (y === this.startY && x === this.startX) {
        drawer.clearSelection()
        this.selectionChange = true
      }
    } else {
      this.baseDiffY += y - this.startY
      this.baseDiffX += x - this.startX
    }
  }
}
