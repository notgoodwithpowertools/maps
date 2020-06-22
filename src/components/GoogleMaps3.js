import React, { useEffect, useRef } from 'react';

import '../css/maps.css'
import Sev3Truck from '../images/truck-red-sm.png'

import Image from './Image.jsx'
// Variables
const MAP_API_KEY = process.env.REACT_APP_MAPS_KEY;

const myLocation = {
    // Aus
    // lat: -28.045364573164893, 
    // lng: 135.946457
    // Melbourne
    lat: -37.3308252885144,
    lng: 145.27956485083416

};

// styles
const mapStyles = {
    width: '100%',
    height: '600px',
};

const getColor = (type) => {

    switch (type) {
        case 'Weather': {
            return 'purple'
        }
        case 'Traffic': {
            return 'blue'
        }
        case 'Covid': {
            return 'yellow'
        }
        case 'Fire': {
            return 'red'
        }
        default: {
            return 'red'
        }
    }

}

const pinSymbol = (color) => {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
    };
}



const GoogleMaps = (props) => {

    const { events, setEventLoc } = props

    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    let legendHTML = `
    <div class='legend'>
    <div class='legendRow'>
    <div class='legendBox legendItemGreen'></div>
    <span>0 Cases</span>
    </div>
    <div class='legendRow'>
    <div class='legendBox legendItemYellow'></div>
    <span>Up to 10 Cases</span>
    </div>
    <div class='legendRow'>
    <div class='legendBox legendItemBlue'></div>
    <span>11 to 20 Cases</span>
    </div>
    <div class='legendRow'>
    <div class='legendBox legendItemRed'></div>
    <span>More than 20 Cases</span>
    </div>
    </div>`


    const createGoogleMap = () => {

        const map = new window.google.maps.Map(googleMapRef.current, {
            zoom: 8,
            center: {
                lat: myLocation.lat,
                lng: myLocation.lng
            }
        });

        var covidControlDiv = document.createElement('div');
        var covidControl = new CovidControl(covidControlDiv, map);
        covidControlDiv.index = 1;
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(covidControlDiv);
        // getLegend()
        // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));

        // Add a listener for the click event
        window.google.maps.event.addListener(map, "rightclick", function (event) {
            console.log("Double Click");
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude)
            getWeatherAtLocation(latitude, longitude, event, map)
        });

        window.google.maps.event.addListener(map, 'click', function (event) {

            console.log("Map clicked...")
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude)
            setEventLoc([latitude, longitude])

        });

        return map

    }

    function CovidControl(controlDiv, map) {

        let active = false

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 2px rgba(0,0,0,.1)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.marginTop = '10px';
        controlUI.title = 'Covid Layer';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontWeight = '480';
        controlText.style.fontSize = '18px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.textContent = 'COVID Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners
        controlUI.addEventListener('click', function () {

            console.log("Clicked ++ ...")
            active ? active = false : active = true

            active ? controlText.style.color = 'blue' : controlText.style.color = 'grey'
            console.log("Covide layer active state is being set to:", active)
            if (active) {

                createCovidLayer(active, googleMap.current)
                // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));
                // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(getLegend());
                // console.log("Map Controls:", map.controls)
                var covidLegendDiv = document.createElement('div');
                covidLegendDiv.innerHTML = legendHTML

                // var covidLegendDiv = document.getElementById('legend').innerHTML = getLegend();
                // var covidLegend = new CovidLegend(covidLegendDiv, map);
                // covidLegendDiv.index = 2;

                map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(covidLegendDiv);

            }
            else {
                removeCovidLayer(active, googleMap.current)
                map.controls[window.google.maps.ControlPosition.LEFT_CENTER].clear();
            }


        });

    }

    const processEvents = () => {
        console.log("Process events ... ", events)

        let markers = []

        events.forEach((event, index) => {
            console.log("eventMarker:", event)

            markers[index] = createMarker(event)
        })
    }


    function myAction() {
        console.log("MyAction")
    }



    const createMarker = (event) => {
        const marker = new window.google.maps.Marker({
            position: { lat: event.loc.Rc, lng: event.loc.Ac },
            map: googleMap.current,
            title: event.source
            ,
            // icon: pinSymbol(getColor(event.source))
            icon: Sev3Truck,
            id: event.id

        });

        // var input = document.createElement('input');
        // input.setAttribute('type', 'button');
        // input.setAttribute('value', 'Delete');
        // function myAction(event) { console.log("hello...") }
        // window.google.maps.event.addDomListener(input, "click", () => {

            


        // });

        let infoHTML =
            `<p>${event.text}</p>`
             
            //  <input type='button' name='Delete' value='Delete' onClick='() => {console.log("MyAction")}'/>`

        
        const infowindow = createInfoWindow(infoHTML)
        marker.addListener('click', function () {
            infowindow.open(googleMap.current, marker);
            console.log(event.text)
        });

        return marker

    }


    // useEffect Hook
    useEffect(() => {

        if (!window.google) {

            const googleMapScript = document.createElement('script');
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places,geometry`
            window.document.body.appendChild(googleMapScript);

            googleMapScript.addEventListener('load', () => {
                googleMap.current = createGoogleMap();

                createTrafficLayer().setMap(googleMap.current)
                createTransitLayer().setMap(googleMap.current)

                // createCovidLayer(googleMap.current)

            })
        }
        processEvents(events)

    }, [events])

    const createInfoWindow = (content, position) => {
        var infowindow = new window.google.maps.InfoWindow({
            content: content,
            position: position

        })
        return infowindow
    }


    const createTrafficLayer = () => {
        var trafficLayer = new window.google.maps.TrafficLayer();
        return trafficLayer
    }

    const createTransitLayer = () => {
        var transitLayer = new window.google.maps.TransitLayer();
        return transitLayer
    }

    const createCovidLayer = (active, map) => {

        console.log("createCovidLayer...", active)

        map.data.loadGeoJson('https://opendata.arcgis.com/datasets/b81aeb7bc2914fa5868e6a961040065a_0.geojson');
        window.google.maps.event.addListenerOnce(map.data, 'addfeature', function () {
            console.log("Covid layer loaded...")

            // Set colours for each LGA based on number of COVID cases
            map.data.setStyle((feature) => {

                let numCases = feature.getProperty('Cases')
                if (numCases > 0) {

                    if (numCases < 11)
                        return ({
                            fillColor: 'yellow'

                        });
                    else {
                        if (numCases < 21)
                            return ({
                                fillColor: 'blue'

                            });
                        else {
                            return ({
                                fillColor: 'red'

                            })
                        }
                    }

                }
                else {
                    return ({
                        fillColor: 'green'

                    });
                }

            });


            // });
            map.data.addListener('load', function (event) {
                // placeMarker(event.latLng);
                console.log("Cases:", event.feature.getProperty('Cases'))
            });
            map.data.addListener('click', function (event) {
                console.log("Cases:", map.data)
                console.log("Cases:", event.feature.getProperty('Cases'))

                var polygon = new window.google.maps.Polygon(
                    console.log("coords:", event.feature.getGeometry('geometry'))
                )
                // new window.google.maps.Marker({
                //     position: polygon.getBoundingBox().getCenter(),
                //     map: map
                // });

                // const infowindow = createInfoWindow("test")
                // infoWindow.setPosition(event.latLng);

                // map.data.overrideStyle(event.feature, { fillColor: 'red' });
            });
        })

    }

    const removeCovidLayer = (active, map) => {

        console.log("removeCovidLayer...", active)

        window.google.maps.event.addListenerOnce(map.data, 'removefeature', function () {
            console.log("Fature removed...")
        })

        map.data.forEach((feature) => {

            // console.log(feature);
            map.data.remove(feature);

        });

    }

    function getWeatherAtLocation(lat, lng, event, map) {

        console.log('getInfoAtLocation...')


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

                            var content = `
                            <div class='weather-desc'>
                            <h3>Weather at this location</h3>
                            <p>Current temp: ${data.current.temp}&#x00B0 C<br>
                            <i class='weather-desc'>${data.current.weather[0].description}</i>
                            <h5 class='weather-desc'>Today's Weather</h5>
                            <p>min ${data.daily[0].temp.min}&#x00B0 C, max ${data.daily[0].temp.max}&#x00B0 C<br>
                            <i class='weather-desc'>${data.daily[0].weather[0].description}</i>
                            <h5 class='weather-desc'>Tomorrow</h5>
                            <p>min ${data.daily[1].temp.min}&#x00B0 C, max ${data.daily[1].temp.max}&#x00B0 C<br>
                            <i class='weather-desc'>${data.daily[1].weather[0].description}</i>
                            <h5 class='weather-desc'>... and then</h5>
                            <p>min ${data.daily[2].temp.min}&#x00B0 C, max ${data.daily[2].temp.max}&#x00B0 C<br>
                            <i class='weather-desc'>${data.daily[2].weather[0].description}</i>
                            <h5 class='weather-desc'>... and then</h5>
                            <p>min ${data.daily[3].temp.min}&#x00B0 C, max ${data.daily[3].temp.max}&#x00B0 C<br>
                            <i class='weather-desc'>${data.daily[3].weather[0].description}</i>
                            <h5 class='weather-desc'>... and then</h5>
                            <p>min ${data.daily[4].temp.min}&#x00B0 C, max ${data.daily[4].temp.max}&#x00B0 C<br>
                            <i class='weather-desc'>${data.daily[4].weather[0].description}</i>
                            </div>`

                            createInfoWindow(content, event.latLng).open(map)

                        });
                }
            )
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });

    }

    return (

        <div>
            <div
                id="google-map"
                ref={googleMapRef}
                style={mapStyles}
            />
            {/* {getLegend()} */}

        </div>
    )

}

export { GoogleMaps as default }