'use strict';

const OpenLink      = require("open");

const electron      = require('electron');
const nativeImage   = electron.nativeImage;
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const Tray          = electron.Tray;
const ui            = require('./ui');
const path          = require('path');
let mainWindow;
var devToolsOpen = false;
var browser = null;
var appIcon = null;

function focusMainWindow() {
    if (!mainWindow || !mainWindow.webContents)
        return;
    mainWindow.focusOnWebView();
    mainWindow.webContents.executeJavaScript('setTimeout(function() { document.getElementsByTagName("webview")[0].focus(); }, 0);');
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
  mainWindow.focus();
  focusMainWindow();
}

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: __dirname + '/electric-glowing-bear.png',
    title: 'Electric Glowing Bear',
    webPreferences: { nodeIntegration: true },
    frame: true
  });

  mainWindow.setProgressBar(-1);
  var menu = Menu.buildFromTemplate(ui.mainMenu);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL('file://' + path.join(__dirname, '/browser/browser.html'))
  browser = mainWindow.webContents;

  browser.on('new-window', function(event, url){
    event.preventDefault();
    OpenLink(url);
    focusMainWindow();
  });

  setTimeout(function() {
      focusMainWindow();
  }, 100);

  browser.on('page-favicon-updated', function(event, favicons) {
    console.log(favicons);
    var data = favicons[0];
    var img = nativeImage.createFromDataURL(data);
    appIcon.setImage(img);
    //mainWindow.setImage(img);
  });


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on('focus', focusMainWindow);
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
