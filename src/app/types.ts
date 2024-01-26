export type temperatureRecord = {
    date: string
    lowest: number
    median: number
    highest: number
}

export type OpenweatherWeatherData = {
    lat: number
    lon: number
    tz: string
    date: string
    units: string
    cloud_cover: {
        afternoon: number
    }
    humidity: {
        afternoon: number
    }
    precipitation: {
        total: number
    }
    temperature: {
        min: number
        max: number
        afternoon: number
        night: number
        evening: number
        morning: number
    }
    pressure: {
        afternoon: number
    }
    wind: {
        max: {
            speed: number
            direction: number
        }
    }
}
