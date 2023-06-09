import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { update } from './update'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { MessageType, apsFullMsg } from '../../proto/aps_msgs'
import fs from 'fs'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let cpp: ChildProcessWithoutNullStreams | null = null

// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    width: 1200,
    height: 800,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  win.maximize()
  // win.removeMenu()

  if (url) {
    // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Apply electron-updater
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

app.on('ready', () => {
  if (process.platform === 'win32') {
    cpp = spawn(join(process.env.PUBLIC, 'cpp', 'aps_process_app.exe'))
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.handle('app-exit', (_, arg) => {
  win = null
  app.quit()
})

ipcMain.handle('open-project', async (event, payload) => {
  if (!win || payload) return

  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory', 'multiSelections']
  })

  if (result.canceled) return

  const directory = result.filePaths[0]

  return directory
})

ipcMain.handle('convert-project', async (event, payload) => {
  if (!win || !cpp) return

  cpp.stdin.write(`${payload.replace(/\\/g, '/')}\n`)

  let processing = false
  let finished = false
  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      const msg = JSON.parse(data.toString())

      if (msg.processStatus === 'processing') {
        processing = true
      }
      if (msg.processStatus === 'idle' && processing) {
        processing = false
        finished = true
      }
      if (finished) {
        // remove stdout listener
        win?.webContents.send('convert-project-reply', JSON.parse(payload).convertImportParam.dataDir)
        cpp!.stdout.removeAllListeners('data')
      }
    }
    catch (err) {
      // console.log(err)
    }
  })
})

ipcMain.handle('loop-select-set', async (event, payload) => {
  if (!win || !cpp) return
  console.log(payload)
  cpp.stdin.write(`${payload}\n`)

  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      // const msg = apsFullMsg.decode(Buffer.from(data.toString().replace(/(\r)/gm, '')))
      // if (msg.topicName === '/aps/loop/manual/select/ack') {
      //   win?.webContents.send('loop-select-set-reply', msg)
      //   cpp!.stdout.removeAllListeners('data')
      // }
      const msg = JSON.parse(data.toString())
      console.log('recive: ', msg)
      if (msg.topicName === '/aps/loop/manual/select/ack') {
        win?.webContents.send('loop-select-set-reply', msg)
        cpp!.stdout.removeAllListeners('data')
      }
    } catch (err) {

    }
  })
})

ipcMain.handle('loop-match-set', async (event, payload) => {
  if (!win || !cpp) return
  console.log(payload)
  cpp.stdin.write(`${payload}\n`)

  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      const msg = JSON.parse(data.toString())
      console.log('recive: ', msg)
      if (msg.topicName === '/aps/loop/manual/match/ack') {
        win?.webContents.send('loop-match-set-reply', msg)
        cpp!.stdout.removeAllListeners('data')
      }
    } catch (err) {
      console.log(err)
    }

  })
})

ipcMain.handle("add-history", async (event, payload) => {
  try {
    if (fs.existsSync(`${app.getPath("userData")}/history.txt`)) {
      // append if payload is not in history content
      const historyContent = fs.readFileSync(
        `${app.getPath("userData")}/history.txt`,
        "utf-8"
      );
      if (!historyContent.includes(payload)) {
        fs.appendFileSync(
          `${app.getPath("userData")}/history.txt`,
          `${payload}\n`
        );
      }
    } else {
      fs.writeFileSync(
        `${app.getPath("userData")}/history.txt`,
        `${payload}\n`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("get-history", async (event, payload) => {
  if (fs.existsSync(`${app.getPath("userData")}/history.txt`)) {
    const historyContent = fs.readFileSync(
      `${app.getPath("userData")}/history.txt`,
      "utf-8"
    );
    return historyContent;
  } else {
    return "";
  }
});

ipcMain.handle('loop-optimize', async (event, payload) => {
  if (!win || !cpp) return
  console.log(payload)

  cpp.stdin.write(`${payload}\n`)

  let processing = false
  let finished = false
  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      const msg = JSON.parse(data.toString())

      if (msg.processStatus === 'processing') {
        processing = true
      }
      if (msg.processStatus === 'idle' && processing) {
        processing = false
        finished = true
      }
      if (finished) {
        // remove stdout listener
        win?.webContents.send('loop-optimize-reply', true)
        // cpp!.stdout.removeAllListeners('data')
        finished = false
      }
    } catch (err) {
      console.log(err)
    }
  })
})

ipcMain.handle('save-project', async (event, payload) => {
  if (!win || !cpp) return
  console.log(payload)

  cpp.stdin.write(`${payload}\n`)

  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      const msg = JSON.parse(data.toString())
      console.log('recive: ', msg)
    } catch (err) {
      console.log(err)
    }
  })
})

ipcMain.handle('export-project', async (event, payload) => {
  if (!win || !cpp) return
  console.log(payload)

  cpp.stdin.write(`${payload}\n`)

  cpp.stdout.on('data', (data) => {
    console.log(data.toString())
    try {
      const msg = JSON.parse(data.toString())
      console.log('recive: ', msg)
    } catch (err) {
      console.log(err)
    }
  })
})