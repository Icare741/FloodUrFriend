const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let controlWindow = null;
let overlayWindow = null;

function createControlWindow() {
  controlWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  controlWindow.loadURL('http://localhost:5173/control');
  controlWindow.webContents.openDevTools();
}

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  overlayWindow.loadURL('http://localhost:5173/overlay');
  overlayWindow.hide();
}

app.whenReady().then(() => {
  createControlWindow();
  createOverlayWindow();
});

ipcMain.on('show-overlay', () => {
  overlayWindow.show();
});

ipcMain.on('hide-overlay', () => {
  overlayWindow.hide();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});