import sunCalc from "suncalc";

import { toAngle } from "./radians";

export function getSunrise(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).sunrise;
}

export function getTodaySunrise(coords: GeolocationCoordinates): Date {
    return getSunrise(new Date(), coords);
}

export function getSunset(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).sunset;
}

export function getTodaySunset(coords: GeolocationCoordinates): Date {
    return getSunset(new Date(), coords);
}

export function getSolarNoon(date: Date, coords: GeolocationCoordinates): Date {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude).solarNoon;
}

export function getTodaySolarNoon(coords: GeolocationCoordinates): Date {
    return getSolarNoon(new Date(), coords);
}

export function getTodayHighestAltitude(coords: GeolocationCoordinates): number {
    return getAltitude(getTodaySolarNoon(coords), coords);
}

export function getCurrentAltitude(coords: GeolocationCoordinates): number {
    return getAltitude(new Date(), coords);
}

export function getAltitude(date: Date, coords: GeolocationCoordinates): number {
    return Math.round(toAngle(sunCalc.getPosition(date, coords.latitude, coords.longitude).altitude) * 100) / 100;
}