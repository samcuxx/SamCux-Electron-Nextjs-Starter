const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.invoke("window-minimize"),
  maximize: () => ipcRenderer.invoke("window-maximize"),
  close: () => ipcRenderer.invoke("window-close"),
  isMaximized: () => ipcRenderer.invoke("window-is-maximized"),
  toggleMaximize: () => ipcRenderer.invoke("window-toggle-maximize"),
  onWindowStateChange: (callback) => {
    ipcRenderer.on("window-state-changed", callback);
    return () => ipcRenderer.removeListener("window-state-changed", callback);
  },
});
