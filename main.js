'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const OpenLink = require("open");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.

  // In the main process.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/glowing-bear.png',
    title: 'Electric Glowing Bear',
    webPreferences: {
      nodeIntegration: false
    }
  });
  // and load the index.html of the app.
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.loadURL('https://chat.buffers.us');
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', function(event, url){
    event.preventDefault();
    OpenLink(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on('focus', function() {
    mainWindow.focusOnWebView();
  })
}

function activateMainWindow(commandLine, cwd) {
  // If a second instance is launched, focus singleton window
  if (!mainWindow) {
    return;
  }
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.show();
  mainWindow.focusOnWebView()
}

if (app.makeSingleInstance(activateMainWindow)) {
  app.quit();
  return;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
