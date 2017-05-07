import Vue from 'vue'
import Electron from 'electron'
import App from './components/App.vue'
import MenuHandler from './menuHandler'
import ToolSet from './model/tool/toolSet'

new Vue({
  el: '#app',
  render: h => h(App)
})

const menuHandler = new MenuHandler(App)

Electron.ipcRenderer.on('select-tool', (event, toolName) => {
  ToolSet.getInstance().selectToolByName(toolName)
})
