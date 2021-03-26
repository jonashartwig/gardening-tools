import sunCalc from "suncalc";
import * as astronomyEngine from "astronomy-engine";

import { toAngle } from "./radians";

function getTimes(date: Date, coords: GeolocationCoordinates): GetTimesResult {
    return sunCalc.getTimes(date, coords.latitude, coords.longitude);
}

export function getSunrise(date: Date, coords: GeolocationCoordinates): Date {
    return getTimes(date, coords).sunriseEnd;
}

export function getSunset(date: Date, coords: GeolocationCoordinates): Date {
    return getTimes(date, coords).sunsetStart;
}

export function getSolarNoon(date: Date, coords: GeolocationCoordinates): Date {
    return getTimes(date, coords).solarNoon;
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

export function getAzimuth(date: Date, coords: GeolocationCoordinates): number {
    return toAngle(sunCalc.getPosition(date, coords.latitude, coords.longitude).azimuth);
}

export function getSpringEquinoxDate(): Date {
    return astronomyEngine.Seasons(new Date().getUTCFullYear()).mar_equinox.date;
}

export function getAutumnEquinoxDate(): Date {
    return astronomyEngine.Seasons(new Date().getUTCFullYear()).sep_equinox.date;
}

export function getSummerSolsticeDate(): Date {
    return astronomyEngine.Seasons(new Date().getUTCFullYear()).jun_solstice.date;
}

export function getWinterSolsticeDate(): Date {
    return astronomyEngine.Seasons(new Date().getUTCFullYear()).dec_solstice.date;
}