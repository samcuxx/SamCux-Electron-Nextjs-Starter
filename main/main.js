const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundMaterial: "acrylic",
    frame: false,
    titleBarStyle: "hidden",
    icon: path.join(__dirname, "../resources/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // IPC handlers for window controls
  ipcMain.handle("window-minimize", () => {
    win.minimize();
  });

  ipcMain.handle("window-maximize", () => {
    win.maximize();
  });

  ipcMain.handle("window-close", () => {
    win.close();
  });

  ipcMain.handle("window-is-maximized", () => {
    return win.isMaximized();
  });

  ipcMain.handle("window-toggle-maximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
    return win.isMaximized();
  });

  // Listen for window state changes
  win.on("maximize", () => {
    win.webContents.send("window-state-changed", { isMaximized: true });
  });

  win.on("unmaximize", () => {
    win.webContents.send("window-state-changed", { isMaximized: false });
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }

  return win;
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
