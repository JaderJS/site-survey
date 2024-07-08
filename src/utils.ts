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
    hr: number
    ht: number
    f: number
}

export const pathLoos = ({ f, d, hr, ht }: params) => {
    const A = 69.5
    const B = 26.16
    const Ahm = (1.1 * Math.log10(f) - 0.7) * ht - (1.56 * Math.log10(f) - 0.8)
    const loss = A + B * Math.log10(f) - 13.82 * Math.log10(hr) - Ahm + (44.9 - 6.55 * Math.log10(hr)) * Math.log10(d / 1000)
    return loss
}

export const wattsToDbm = (w: number) => {
    return 10 * Math.log10(w * 1000)
}