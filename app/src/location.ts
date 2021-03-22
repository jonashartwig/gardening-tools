import * as sun from "./service/sun";
import { getMultiplicator } from "./service/shadow";

export default class SunLocation {
    readonly shadowMultiplyer: number
    
    constructor(
        readonly time: Date,
        readonly altitude: number
    ) {
        this.shadowMultiplyer = getMultiplicator(altitude);
    }

    static atNoon(date: Date, coords: GeolocationCoordinates): SunLocation {
        return new SunLocation(
            sun.getSolarNoon(date, coords),
            sun.getNoonAltitude(date, coords)
        );
    }

    static atSunSet(date: Date, coords: GeolocationCoordinates): SunLocation {
        return new SunLocation(
            sun.getSunset(date, coords),
            sun.getSunsetAltitude(date, coords)
        );
    }

    static atSunRise(date: Date, coords: GeolocationCoordinates): SunLocation {
        return new SunLocation(
            sun.getSunrise(date, coords),
            sun.getSunriseAltitude(date, coords)
        );
    }
}