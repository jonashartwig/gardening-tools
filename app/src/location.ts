import * as sun from "./service/sun";
import { getMultiplicator } from "./service/shadow";

export default class SunLocation {
    readonly shadowMultiplier: number
    
    constructor(
        readonly time: Date,
        readonly altitude: number
    ) {
        this.shadowMultiplier = getMultiplicator(altitude);
    }

    static atNoon(date: Date, coords: GeolocationCoordinates): SunLocation {
        return new SunLocation(
            sun.getSolarNoon(date, coords),
            sun.getNoonAltitude(date, coords)
        );
    }

    static atSunset(date: Date, coords: GeolocationCoordinates): SunLocation {
        const sunset = sun.getSunset(date, coords);
        
        return new SunLocation(
            sunset,
            sun.getAltitude(new Date(sunset.getTime() - 60 * 60000), coords)
        );
    }

    static atSunrise(date: Date, coords: GeolocationCoordinates): SunLocation {
        const sunrise = sun.getSunrise(date, coords)
        
        return new SunLocation(
            sunrise,
            sun.getAltitude(new Date(sunrise.getTime() + 60 * 60000), coords)
        );
    }
}