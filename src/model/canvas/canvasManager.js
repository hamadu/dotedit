import Canvas from './canvas'
import Drawer from './../../drawer'

export default class CanvasManager {
  constructor() {
    const initialCanvas = new Canvas(64, 64)
    this.canvases = [initialCanvas]
    this.currentCanvas = initialCanvas
    this.drawer = new Drawer(initialCanvas)
  }

  setCanvas(canvas) {
    this.currentCanvas = canvas
    this.drawer.setCanvas(canvas)
  }

  setCanvasSize(newHeight, newWidth) {
    this.currentCanvas.changeCanvasSize(newHeight, newWidth)
    this.drawer.setCanvas(this.currentCanvas)
  }

  addCanvas() {
    const newCanvas = new Canvas(64, 64);
    this.canvases.push(newCanvas);
    return newCanvas;
  }

  currentDots() {
    return this.currentCanvas.dots
  }

  currentSelectDots() {
    return this.currentCanvas.selectDots
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

  selectAll() {
    this.drawer.selectAll()
  }

  deleteSelection() {
    this.drawer.deleteSelection()
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
