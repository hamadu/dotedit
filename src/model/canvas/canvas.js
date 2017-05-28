import CanvasState from './../canvasState'
import DotHistory from './../dotHistory'

export default class Canvas {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.dots = []
    this.selectDots = []
    for (let i = 0 ; i < height ; i++) {
      for (let j = 0 ; j < width ; j++) {
        this.dots.push(0)
        this.selectDots.push(false)
      }
    }
    this.history = new DotHistory(this.dots)
    this.state = new CanvasState()
  }

  changeCanvasSize(newHeight, newWidth) {
    const newDots = []
    const newSelectDots = []
    for (let i = 0 ; i < newHeight ; i++) {
      for (let j = 0 ; j < newWidth ; j++) {
        if (i < this.height && j < this.width) {
          newDots.push(this.dots[i * this.width + j])
        } else {
          newDots.push(0)
        }
        newSelectDots.push(false)
      }
    }
    this.height = newHeight
    this.width = newWidth
    this.dots.splice(0, this.dots.length, ...newDots)
    this.selectDots.splice(0, this.selectDots.length, ...newSelectDots)
    this.history = new DotHistory(this.dots)
    this.state.offsetY = 0
    this.state.offsetX = 0
  }
}
