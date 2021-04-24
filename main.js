//TODO: convert to ts file
const APP_NAME = 'fighty-monsters';
const {app, BrowserWindow} = require('electron');
const StorageHandler = require('./electron/storage-handler');
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


ipc.on('print', (event, arg) => {
  console.log('Print Initiated');
    win.webContents.print(options, (success, failureReason) => {
        if (!success) {
          console.log(failureReason);
        }
    });
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

// initialize all data files and ipc handlers
StorageHandler.initializeAllStorage(ipc);