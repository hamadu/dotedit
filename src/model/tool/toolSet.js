import Pencil from './pencil'
import Line from './line'
import Rect from './rect'
import Oval from './oval'
import Bucket from './bucket'

export default class ToolSet {
  constructor(tools) {
    this.tools = tools
    this.currentTool = tools[0]
  }

  selectTool(newTool) {
    if (this.currentTool === newTool) {
      this.currentTool.toggle()
    } else {
      this.currentTool = newTool
    }
  }

  selectToolByName(newToolName) {
    const newTool = this.tools.filter(tool => tool.name === newToolName)[0]
    if (newTool) {
      this.selectTool(newTool)
    }
  }

  static getInstance() {
    if (!ToolSet.box) {
      ToolSet.box = new ToolSet(ToolSet.defaultTools)
    }
    return ToolSet.box
  }

  static get defaultTools() {
    return [
      new Pencil(),
      new Line(),
      new Rect(),
      new Oval(),
      new Bucket()
    ]
  }
}
