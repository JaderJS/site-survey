export const decodeSerialData = (data: string) => {
    const str = data.toString()
    const match = str.match(/@([^$]+)\$/)

    const randLat = Math.random() * 2 - 1
    const randLon = Math.random() * 2 - 1


    if (match && match[1]) {
        const [latitude, longitude, altitude, rssi] = match[1].split(',')
        return {
            latitude: parseFloat(latitude) + randLat,
            longitude: parseFloat(longitude) + randLon,
            altitude: parseInt(altitude, 10),
            rssi: parseInt(rssi, 10) + randLat - randLon,
        }
    }
    return null
}

interface params {
    pr?: number
    pt?: number
    pw?: number
    d: number
    h: number
}

export const pathLoos = ({ d, h }: params) => {
    const A = 69.5
    const B = 26.16
    const C = -4
    const loss = A + B * Math.log10(d) + C - 13.82 * Math.log10(h) - (44.9 - 6.55 * Math.log10(h)) * Math.log10(d * 1E3)
    console.log(loss, "dBm")
}