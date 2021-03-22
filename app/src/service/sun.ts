import sunCalc from "suncalc";

import { toAngle } from "./radians";

export function getSunrise(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).sunrise;
}

export function getSunset(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).sunset;
}

export function getSolarNoon(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).solarNoon;
}

export function getNoonAltitude(date: Date, coords: GeolocationCoordinates): number {
    return getAltitude(getSolarNoon(date, coords), coords);
}

export function getSunsetAltitude(date: Date, coords: GeolocationCoordinates): number {
    return getAltitude(getSunset(date, coords), coords);
}

export function getSunriseAltitude(date: Date, coords: GeolocationCoordinates): number {
    return getAltitude(getSunrise(date, coords), coords);
}

export function getCurrentAltitude(coords: GeolocationCoordinates): number {
    return getAltitude(new Date(), coords);
}

export function getAltitude(date: Date, coords: GeolocationCoordinates): number {
    return toAngle(sunCalc.getPosition(date, coords.latitude, coords.longitude).altitude);
}