export async function get(): Promise<GeolocationCoordinates> {
    if (navigator.geolocation) {
        return new Promise((resolve, _) => {
            navigator.geolocation.getCurrentPosition(geolocationPosition => {
                resolve(geolocationPosition.coords)
            })
        });
    } else {
        return Promise.reject()
    }
}