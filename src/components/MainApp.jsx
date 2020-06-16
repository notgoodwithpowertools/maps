import React, { useEffect } from 'react'
// import {
//     BrowserRouter as Router,
// } from "react-router-dom"

import SectorPanel from './SectorPanel.jsx'
import GoogleMaps3 from './GoogleMaps3.js'
// import ControlsPanel from './ControlsPanel.jsx'


// efc67a93a72da52608a8a96e19fd3222
// api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}

// https://api.openweathermap.org/data/2.5/weather?id=2158177&units=metric&appid=efc67a93a72da52608a8a96e19fd3222


const MainApp = () => {

    // const [covidLayer, setCovidLayer] = useState(1)
    // const [loaded, setLoaded] = useState(false)

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);

    useEffect(() => {
        console.log("MainApp useEffect ...")

        fetch('https://api.openweathermap.org/data/2.5/weather?id=2158177&units=metric&appid=efc67a93a72da52608a8a96e19fd3222')
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
                        });
                }
            )
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });



    }, []);

    return (
        
            <div className='MainApp'>
                <SectorPanel />
                {/* <ControlsPanel onClick={setCovidLayer} covidLayer={covidLayer} /> */}
                {/* <GoogleMaps covidLayer={covidLayer} loaded={loaded} setLoaded={setLoaded}/> */}
                <GoogleMaps3 />
            </div>
  
    )

}

export { MainApp as default }