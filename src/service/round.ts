export default function roundToTwoDecimals(number: number): number {
    return Math.round(number * 100) / 100;
}