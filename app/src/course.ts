import SunPosition from "./location";

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
}