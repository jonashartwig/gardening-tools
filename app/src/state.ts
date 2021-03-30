import { get } from "./service/location";
import { getCurrentAltitude } from "./service/sun";
import { getMultiplicator } from "./service/shadow";
import SunCourse from "./course";
import SunLocation from "./location";

class State {
    readonly today: SunCourse
    readonly springEquinox: SunCourse
    readonly summerSolstice: SunCourse
    readonly autumnEquinox: SunCourse
    readonly winterSolstice: SunCourse
    readonly sortedDates: Array<SunCourse>
    readonly now: SunLocation
    
    constructor(public readonly coords: GeolocationCoordinates) {
        this.today = SunCourse.today(coords);
        
        this.springEquinox = SunCourse.atSpringEquinox(coords);
        this.autumnEquinox = SunCourse.atAutumnEquinox(coords);

        this.summerSolstice = SunCourse.atSummerSolstice(coords);
        this.winterSolstice = SunCourse.atWinterSolstice(coords);

        this.now = SunLocation.atDate(new Date(), coords);

        this.sortedDates = [
            this.today,
            this.springEquinox,
            this.summerSolstice,
            this.autumnEquinox,
            this.winterSolstice
        ].sort((a, b) => a.sunrise.time.getTime() - b.sunrise.time.getTime());
    }

    static async initialize(): Promise<State> {
        return await get()
            .then(position => new State(position))
    }
}

export default State;