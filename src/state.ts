import { get } from "./service/location";

class State {
    constructor(public readonly position: GeolocationCoordinates) {}

    static async initialize(): Promise<State> {
        return await get()
            .then(position => new State(position))
    }
}

export default State;