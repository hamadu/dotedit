import style from 'spectre.css/dist/spectre.min.css'

import Vue from 'vue'
import Electron from 'electron'
import App from './components/App.vue'
import ToolSet from './model/tool/toolSet'
import CanvasManager from './model/canvas/canvasManager'

new Vue({
  el: '#app',
  render: h => h(App)
})

Electron.ipcRenderer.on('edit', (event, subMenu) => {
  switch (subMenu) {
    case 'undo':
      App.methods.undo.bind(App.data())()
      break
    case 'redo':
      App.methods.redo.bind(App.data())()
      break
    case 'cut':
      App.methods.cut.bind(App.data())()
      break
    case 'copy':
      App.methods.copy.bind(App.data())()
      break
    case 'paste':
      App.methods.paste.bind(App.data())()
      break
    case 'delete':
      App.methods.deleteSelection.bind(App.data())()
      break
    case 'select-all':
      App.methods.selectAll.bind(App.data())()
      break
  }
})

Electron.ipcRenderer.on('select-tool', (event, toolName) => {
  ToolSet.getInstance().selectToolByName(toolName)
})

Electron.ipcRenderer.on('canvas', (event, subMenu) => {
  switch (subMenu) {
    case 'scale-up':
      CanvasManager.getInstance().currentState().scaleUp()
      break
    case 'scale-down':
      CanvasManager.getInstance().currentState().scaleDown()
      break
    case 'pick-color':
      // MURIKURI
      App.methods.pickColor.bind(App.data())()
      break
  }
})
