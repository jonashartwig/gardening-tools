import sunCalc from "suncalc";

export function getAltitude(date: Date, coords: GeolocationCoordinates): number {
    return Math.round(sunCalc.getPosition(date, coords.latitude, coords.longitude).altitude * 180 / Math.PI * 100) / 100;
}