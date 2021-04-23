//TODO: convert to ts file
const APP_NAME = 'fighty-monsters';
const {app, BrowserWindow} = require('electron');
const LookupModule = require('./electron/lookups.js');
const MonsterModule = require('./electron/monster-cards.js');
const ipc = require('electron').ipcMain;
const Store = require('electron-store');

let win;
var options = {
    silent: false,
    printBackground: true,
    color: true,
    margin: {
        marginType: 'printableArea'
    },
    landscape: true,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page'
}

LookupModule.initializeLookups(ipc, APP_NAME);

function createWindow () {
  win = new BrowserWindow({
    width: 2600,
    height: 1200,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
    }
  })
  win.webContents.openDevTools();
  win.loadURL(`http://localhost:4200/index.html`);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('certificate-error', function(event, webContents, url, error, 
  certificate, callback) {
      event.preventDefault();
      callback(true);
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      }
  });
});

// custom app modules
MonsterModule.initializeMonsterStorage(ipc, APP_NAME);