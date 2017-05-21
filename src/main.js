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

Electron.ipcRenderer.on('select-tool', (event, toolName) => {
  ToolSet.getInstance().selectToolByName(toolName)
})

Electron.ipcRenderer.on('scale', (event, upOrDown) => {
  if (upOrDown === 'up') {
    CanvasState.getInstance().scaleUp();
  } else {
    CanvasState.getInstance().scaleDown();
  }
})
