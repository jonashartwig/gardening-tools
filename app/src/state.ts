import { get } from "./service/location";
import { getTodaySunset, getTodaySunrise, getTodayHighestAltitude, getCurrentAltitude, getTodaySolarNoon } from "./service/sun";
import { getMultiplicator } from "./service/shadow";

class State {
    readonly sunset: Date
    readonly sunrise: Date
    readonly solarNoon: Date
    readonly highestAltitude: number
    readonly shadowMultiplierAtHighestAltitude: number
    readonly shadowMultiplierAtCurrentAltitude: number
    readonly currentAltitude: number
    
    constructor(public readonly coords: GeolocationCoordinates) {
        this.sunset = getTodaySunset(coords)
        this.sunrise = getTodaySunrise(coords)
        this.solarNoon = getTodaySolarNoon(coords)
        this.highestAltitude = getTodayHighestAltitude(coords)
        this.shadowMultiplierAtHighestAltitude = getMultiplicator(this.highestAltitude)
        this.currentAltitude = getCurrentAltitude(coords)
        this.shadowMultiplierAtCurrentAltitude = getMultiplicator(this.currentAltitude)
    }

    static async initialize(): Promise<State> {
        return await get()
            .then(position => new State(position))
    }
}

export default State;