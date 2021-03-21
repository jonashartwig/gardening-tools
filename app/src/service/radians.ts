const conversionFactor = 180 / Math.PI

export function toAngle(radians: number): number {
    return radians * conversionFactor;
}

export function toRadian(angle: number): number {
    return angle / conversionFactor;
}