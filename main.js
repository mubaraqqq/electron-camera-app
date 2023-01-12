const path = require("path");
const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");

const isMac = process.platform === "darwin";

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Open Camera",
        click: () => {
          const win2 = new BrowserWindow({
            width: 800,
            height: 500,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, "preload.js"),
            },
          });

          ipcMain.on("close-window2", (event) => {
            event.preventDefault();
            win2.hide();
          });

          win2.webContents.openDevTools();

          win2.loadFile("camera.html");
          //   win2.loadURL("https://mubaraq-cryptoverse.netlify.app");

          win2.once("ready-to-show", () => {
            win2.show();
          });
        },
      },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal(
            "https://www.mubaraq-cryptoverse.netlify.app"
          );
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "Minimize",
      },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("send-image", (event, data) => {
    mainWindow.webContents.send("receive-image", data);

    event.reply("receive-image", data);
  });

  mainWindow.on("closed", () => (mainWindow = null));

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
