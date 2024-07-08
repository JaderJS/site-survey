
const portsElement = document.getElementById("ports") as HTMLSelectElement
const connectBtn = document.getElementById("connectBtn")
const disconnectBtn = document.getElementById("disconnectBtn")
const receivedElement = document.getElementById("received") as HTMLTextAreaElement

let points_: any = []

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const serialPorts: Port[] = await serial.list()

        serialPorts.forEach((port) => {
            const option = document.createElement("option")
            option.value = port.path
            option.textContent = port.path
            portsElement?.appendChild(option)
        })


    } catch (error) {
        console.error(error)
    }

    connectBtn?.addEventListener("click", () => {
        const selectedPort = portsElement?.value
        try {
            serial.connect(selectedPort, 9600)

            serial.onData((data) => {
                const decoded = new TextDecoder('utf-8')
                receivedElement.textContent += decoded.decode(data)
            })

            serial.onDataL((data) => {
                L.marker([data.latitude, data.longitude]).addTo(map).bindPopup(`rssi:${data.rssi}`).openPopup()
                points_.push([data.latitude, data.longitude, Math.abs(data.rssi) * 10])
                //@ts-expect-error
                L.heatLayer(points_, { radius: 20 }).addTo(map)
            })

        } catch (error) {
            console.error(error)
        }
    })

    disconnectBtn?.addEventListener("click", () => {
        serial.disconnect()
    })

})

const map = L.map('map').setView([-9.2, -50.09], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)