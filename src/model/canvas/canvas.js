import CanvasState from './../canvasState'
import DotHistory from './../dotHistory'

export default class Canvas {
  constructor(height, width) {
    this.dots = [];
    for (let i = 0 ; i < height ; i++) {
      for (let j = 0 ; j < width ; j++) {
        this.dots.push(0);
      }
    }
    this.history = new DotHistory(this.dots);
    this.state = new CanvasState();
  }
}
