import SunPosition from "./location";

export default class SunCourse {
    constructor(
        readonly sunRise: SunPosition,
        readonly noon: SunPosition,
        readonly sunSet: SunPosition
    ) {}

    static atDay(date: Date, coords: GeolocationCoordinates): SunCourse {
        return new SunCourse(
            SunPosition.atSunRise(date, coords),
            SunPosition.atNoon(date, coords),
            SunPosition.atSunSet(date, coords)
        ); 
    }
}