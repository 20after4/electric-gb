'use strict';

const OpenLink      = require("open");

const electron      = require('electron');
const nativeImage   = electron.nativeImage;
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const Tray          = electron.Tray;
const ui            = require('./ui');

let mainWindow;
var devToolsOpen = false;



/* [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function() {
          require('electron').dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]});
        }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'F12',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];*/

var browser = null;
var appIcon = null;

function createWindow () {
  function showMainWindow(event, bounds){
    mainWindow.show();
    mainWindow.restore();
    mainWindow.focusOnWebView();
  }


  mainWindow = new BrowserWindow({
    icon: __dirname + '/electric-glowing-bear.png',
    title: 'Electric Glowing Bear',
    webPreferences: {
      nodeIntegration: false
    }
  });
  mainWindow.setProgressBar(-1)
  var menu = Menu.buildFromTemplate(ui.mainMenu);
  Menu.setApplicationMenu(menu);

  appIcon = new Tray(__dirname + '/images/tray.png');
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: showMainWindow
    },

  ]);
  appIcon.setToolTip('Electric Glowing Bear.');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click', showMainWindow);

  // and load the index.html of the app.
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.loadURL('file://'+__dirname + '/glowing-bear/index.html');

  browser = mainWindow.webContents;

  browser.on('new-window', function(event, url){
    event.preventDefault();
    OpenLink(url);
    mainWindow.focusOnWebView()
  });

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
