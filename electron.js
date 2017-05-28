const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  win.loadURL('http://localhost:8080')

  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CommandOrControl+Z',
          click() { win.webContents.send('edit', 'undo') }
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CommandOrControl+Z',
          click() { win.webContents.send('edit', 'redo') }
        },
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {
          label: 'Delete',
          accelerator: 'Delete',
          click() { win.webContents.send('edit', 'delete') }
        },
        {
          label: 'Select All',
          accelerator: 'CommandOrControl+A',
          click() { win.webContents.send('edit', 'select-all') }
        }
      ]
    },
    {
      label: 'Tool',
      submenu: [
        {
          label: 'Pencil',
          accelerator: 'A',
          click() { win.webContents.send('select-tool', 'Pencil') }
        },
        {
          label: 'Line',
          accelerator: 'S',
          click() { win.webContents.send('select-tool', 'Line') }
        },
        {
          label: 'Rect',
          accelerator: 'D',
          click() { win.webContents.send('select-tool', 'Rect') }
        },
        {
          label: 'Oval',
          accelerator: 'F',
          click() { win.webContents.send('select-tool', 'Oval') }
        },
        {
          label: 'Bucket',
          accelerator: 'G',
          click() { win.webContents.send('select-tool', 'Bucket') }
        }
      ]
    },
    {
      label: 'Canvas',
      submenu: [
        {
          label: 'Pick Color',
          accelerator: 'Q',
          click() { win.webContents.send('canvas', 'pick-color') }
        },
        {
          label: 'Scale up',
          accelerator: 'Z',
          click() { win.webContents.send('canvas', 'scale-up') }
        },
        {
          label: 'Scale down',
          accelerator: 'X',
          click() { win.webContents.send('canvas', 'scale-down') }
        },
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electron.atom.io') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)

  Menu.setApplicationMenu(menu)


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
