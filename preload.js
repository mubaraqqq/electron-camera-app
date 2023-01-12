const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  sendImage: (...args) => ipcRenderer.send("send-image", ...args),
  receiveImage: (func) =>
    ipcRenderer.on("receive-image", (e, ...args) => func(...args)),
  closeWindow2: () => ipcRenderer.send("close-window2"),
});
