import Canvas from './canvas'

export default class CanvasManager {
  constructor() {
    const initialCanvas = new Canvas(64, 64)
    this.canvases = [initialCanvas]
    this.currentCanvas = initialCanvas
  }

  currentDrawer() {

  }

  currentDots() {
    return this.currentCanvas.dots
  }

  currentState() {
    return this.currentCanvas.state
  }

  currentHistory() {
    return this.currentCanvas.history
  }

  undo() {
    const len = this.currentDots().length
    this.currentDots().splice(0, len, ...this.currentHistory().prev())
  }

  redo() {
    const len = this.currentDots().length
    this.currentDots().splice(0, len, ...this.currentHistory().next())
  }

  changeOffset(y, x) {
    const state = this.currentState()
    state.offsetY = y
    state.offsetX = x
  }

  pushToHistory(dots) {
    this.currentHistory().push(dots)
  }

  static getInstance() {
    if (!CanvasManager.manager) {
      CanvasManager.manager = new CanvasManager()
    }
    return CanvasManager.manager
  }
}
