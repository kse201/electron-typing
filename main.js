const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win

function createMenu () {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Close',
          click: () => app.quit()
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

function createWindow () {
  win = new BrowserWindow({
    width: 600,
    height: 350,
    resizable: process.env.APP_DEBUG || false
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  if (process.env.APP_DEBUG) win.webContents.openDevTools() // for DEBUG config

  win.on('closed', () => {
    win = null
  })

  createMenu()
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
