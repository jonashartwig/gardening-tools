import * as sun from "./service/sun";
import { getMultiplicator } from "./service/shadow";
import { DeltaT_JplHorizons } from "astronomy-engine";

export default class SunLocation {
    readonly shadowMultiplier: number
    
    constructor(
        readonly time: Date,
        readonly altitude: number,
        readonly azimuth: number
    ) {
        this.shadowMultiplier = getMultiplicator(altitude);
    }

    static atDate(date: Date, coords: GeolocationCoordinates): SunLocation {
        return new SunLocation(
            date,
            sun.getAltitude(date, coords),
            sun.getAzimuth(date, coords)
        );
    }

    static atNoon(date: Date, coords: GeolocationCoordinates): SunLocation {
        const solarNoon = sun.getSolarNoon(date, coords);
        
        return this.atDate(solarNoon, coords);
    }

    static atSunset(date: Date, coords: GeolocationCoordinates): SunLocation {
        const sunset = sun.getSunset(date, coords);
        
        return new SunLocation(
            sunset,
            sun.getAltitude(new Date(sunset.getTime() - 60 * 60000), coords),
            sun.getAzimuth(sunset, coords)
        );
    }

    static atSunrise(date: Date, coords: GeolocationCoordinates): SunLocation {
        const sunrise = sun.getSunrise(date, coords);
        
        return new SunLocation(
            sunrise,
            sun.getAltitude(new Date(sunrise.getTime() + 60 * 60000), coords),
            sun.getAzimuth(sunrise, coords)
        );
    }
}