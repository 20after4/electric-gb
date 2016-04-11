module.exports = {};
var ipc = require('ipc');

module.exports.mainMenu = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Find',
        accelerator: 'CmdOrCtrl+F',
        role: 'find',
        click: function(item, focusedWindow) {
          focusedWindow.webContents.executeJavaScript('window.find("test", 0, 0, true, 0, 0, true)');
        }
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
];
