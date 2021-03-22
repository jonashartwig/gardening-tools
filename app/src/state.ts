import { get } from "./service/location";
import { getCurrentAltitude } from "./service/sun";
import { getMultiplicator } from "./service/shadow";
import SunCourse from "./course";

class State {
    readonly today: SunCourse
    readonly summerSolstice: SunCourse
    readonly winterSolstice: SunCourse
    readonly currentAltitude: number
    readonly shadowMultiplierAtCurrentAltitude: number
    
    constructor(public readonly coords: GeolocationCoordinates) {
        this.today = SunCourse.atDay(new Date(), coords)
        this.summerSolstice = SunCourse.atDay(new Date(new Date().getFullYear(), 6, 21), coords)
        this.winterSolstice = SunCourse.atDay(new Date(new Date().getFullYear(), 12, 21), coords)
        this.currentAltitude = getCurrentAltitude(coords)
        this.shadowMultiplierAtCurrentAltitude = getMultiplicator(this.currentAltitude)
    }

    static async initialize(): Promise<State> {
        return await get()
            .then(position => new State(position))
    }
}

export default State;