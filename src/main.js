import Vue from 'vue'
import Electron from 'electron'
import App from './components/App.vue'
import MenuHandler from './menuHandler'
import ToolSet from './model/tool/toolSet'
import CanvasState from './model/canvasState'

new Vue({
  el: '#app',
  render: h => h(App)
})

const menuHandler = new MenuHandler(App)

Electron.ipcRenderer.on('edit', (event, subMenu) => {
  switch (subMenu) {
    case 'undo':
      App.methods.undo.bind(App.data())()
      break
    case 'redo':
      App.methods.redo.bind(App.data())()
      break
  }
})


Electron.ipcRenderer.on('select-tool', (event, toolName) => {
  ToolSet.getInstance().selectToolByName(toolName)
})

Electron.ipcRenderer.on('canvas', (event, subMenu) => {
  switch (subMenu) {
    case 'scale-up':
      CanvasState.getInstance().scaleUp()
      break
    case 'scale-down':
      CanvasState.getInstance().scaleDown()
      break
    case 'pick-color':
      // MURIKURI
      App.methods.pickColor.bind(App.data())()
      break
  }
})
