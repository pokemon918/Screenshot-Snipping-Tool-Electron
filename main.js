const { app, BrowserWindow } = require('electron');
const { ipcRenderer } = window.require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        },
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        titleBarStyle: 'customButtonsOnHover',
    });

    if (process.env.DEBUG) {
        win.loadURL(`http://localhost:3000`);
    } else {
        win.loadURL(`file://${__dirname}/build/index.html`);
    }

    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
