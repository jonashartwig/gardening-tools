import SunPosition from "./location";
import * as sun from "./service/sun";

export default class SunCourse {
    constructor(
        readonly translationKey: String,
        readonly sunrise: SunPosition,
        readonly noon: SunPosition,
        readonly sunset: SunPosition
    ) {}

    static atDay(translationKey: String, date: Date, coords: GeolocationCoordinates): SunCourse {
        return new SunCourse(
            translationKey,
            SunPosition.atSunrise(date, coords),
            SunPosition.atNoon(date, coords),
            SunPosition.atSunset(date, coords)
        ); 
    }

    static today(coords: GeolocationCoordinates): SunCourse {
        return this.atDay("today", new Date(), coords);
    }

    static atWinterSolstice(coords: GeolocationCoordinates): SunCourse {
        return this.atDay("winter_solstice", sun.getWinterSolsticeDate(), coords);
    }

    static atSummerSolstice(coords: GeolocationCoordinates): SunCourse {
        return this.atDay("summer_solstice", sun.getSummerSolsticeDate(), coords);
    }
    
    static atAutumnEquinox(coords: GeolocationCoordinates): SunCourse {
        return this.atDay("autumn_equinox", sun.getAutumnEquinoxDate(), coords);
    }
    
    static atSpringEquinox(coords: GeolocationCoordinates): SunCourse {
        return this.atDay("spring_equinox", sun.getSpringEquinoxDate(), coords);
    }
}