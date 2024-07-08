
import { contextBridge, ipcRenderer } from 'electron'
import { SerialPort, } from 'serialport'
import { decodeSerialData, pathLoos, wattsToDbm } from './utils'

let serial: SerialPort

//my string serial template
// @-9.001,-54.12334,128,-92$ 

contextBridge.exposeInMainWorld('serial', {
    list: async () => (await SerialPort.list()).map((port) => port),
    connect: (path: string, baudRate = 9600) => {
        serial = new SerialPort({ path, baudRate })
        return serial
    },
    disconnect: () => {
        serial.close()
    },
    onData: (callback: any) => {
        if (!serial)
            return

        serial.on('data', callback)
    },
    onDataL: (callback: any) => {
        if (!serial)
            return

        serial.on('data', (data) => {
            const decoded = new TextDecoder('utf-8')
            const processed = decodeSerialData(decoded.decode(data))
            const loss = pathLoos({ f: 160, d: 30E3, hr: 50, ht: 1.5 })

            console.log("LOSS", loss)
            if (!processed)
                return
            callback(processed)
        })
    },
    write: () => { },
})

contextBridge.exposeInMainWorld('api', {
    pathLoss: (data: { f: number, d: number, hr: number, ht: number }) => pathLoos(data),
    wattsToDbm: (watts: number) => wattsToDbm(watts)
})