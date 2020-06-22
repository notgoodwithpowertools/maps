
export const getWeatherAtPoint = (lat, lng) => {

    console.log("getWeatherAtPoint...", lat + ' : ' + lng)

    // fetch('https://api.openweathermap.org/data/2.5/weather?id=2158177&units=metric&appid=efc67a93a72da52608a8a96e19fd3222')
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={minutely,hourly}&units=metric&appid=efc67a93a72da52608a8a96e19fd3222`)
        .then(
            (response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json()
                    .then((data) => {
                        console.log('Data:', data);
                        return data
                    });
            }
        )
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
}

export { getWeatherAtPoint as default }