import Pencil from './pencil'

export default class ToolSet {
  constructor(tools) {
    this.tools = tools
    this.currentTool = tools[0]
  }

  selectTool(newTool) {
    this.currentTool = newTool;
  }

  static getInstance() {
    if (!ToolSet.box) {
      ToolSet.box = new ToolSet(ToolSet.defaultTools)
    }
    return ToolSet.box;
  }

  static get defaultTools() {
    return [
      new Pencil()
    ]
  }
}
