const connectMapBtn = document.getElementById("connectBtn")

// const map = L.map('map').setView([-9.2, -50.09], 13)
// // @-9.001,-54.12334,128,-92$ 

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map)


// Exemplo de marcador
// L.marker([-9.2, -50.09]).addTo(map)
//     .bindPopup('Aqui está o Leaflet!')
//     .openPopup()

let points: any = []

// setInterval(() => {
//     const random = Math.random() * 2 - 1
//     const lat = -9.2 + random
//     const long = -50.09 + random
//     points.push([lat, long, Math.random() * 1000])
// }, 1000)

// //@ts-expect-error
// L.heatLayer(points, { radius: 20 }).addTo(map)

document.addEventListener("DOMContentLoaded", async () => {

    connectMapBtn?.addEventListener("click", () => {

        serial.onDataL((data) => {
            console.log("MAP", data)
            // L.marker([data.latitude, data.longitude]).addTo(map)
            //     .bindPopup('Live!')
            //     .openPopup()

        })
    })
})