const GetUserLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (geolocation) => {
                resolve([geolocation.coords.latitude, geolocation.coords.longitude])
            },
            (err) => {
                alert('No se puede obtener la geolocalizacion')
                reject()
            }
        )
    })
}

export default GetUserLocation;