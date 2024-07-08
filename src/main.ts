import { app, ipcMain, BrowserWindow } from "electron"
import path from "node:path"
let mainWindow: BrowserWindow

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
        },
        show: false,

    })
    mainWindow.webContents.openDevTools()
    mainWindow.loadFile("./index.html")
    mainWindow.on("ready-to-show", () => mainWindow.show())
})