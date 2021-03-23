import SunPosition from "./location";
import * as sun from "./service/sun";

export default class SunCourse {
    constructor(
        readonly sunrise: SunPosition,
        readonly noon: SunPosition,
        readonly sunset: SunPosition
    ) {}

    static atDay(date: Date, coords: GeolocationCoordinates): SunCourse {
        return new SunCourse(
            SunPosition.atSunrise(date, coords),
            SunPosition.atNoon(date, coords),
            SunPosition.atSunset(date, coords)
        ); 
    }

    static today(coords: GeolocationCoordinates): SunCourse {
        return this.atDay(new Date(), coords);
    }

    static atWinterSolstice(coords: GeolocationCoordinates): SunCourse {
        return this.atDay(sun.getWinterSolsticeDate(), coords);
    }

    static atSummerSolstice(coords: GeolocationCoordinates): SunCourse {
        return this.atDay(sun.getSummerSolsticeDate(), coords);
    }
    
    static atAutumnEquinox(coords: GeolocationCoordinates): SunCourse {
        return this.atDay(sun.getAutumnEquinoxDate(), coords);
    }
    
    static atSpringEquinox(coords: GeolocationCoordinates): SunCourse {
        return this.atDay(sun.getSpringEquinoxDate(), coords);
    }
}