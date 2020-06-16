import React, { useState, useEffect, useRef } from 'react';

import '../css/maps.css'

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


const GoogleMaps = (props) => {

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
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(covidControlDiv);
        // getLegend()
        // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));

        // Add a listener for the click event
        window.google.maps.event.addListener(map, 'click', function (event) {

            console.log("Map clicked...")
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude);

        });

        return map

    }

    // function CovidLegend(legendDiv, map) {

    //     var legendUI = document.createElement(getLegend());
    //     legendUI.style.backgroundColor = '#fff';
    //     legendDiv.appendChild(legendUI)

    // }

    function CovidControl(controlDiv, map) {

        let active = false

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.margin = '8px';
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
                
                map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(covidLegendDiv);


            }
            else {
                removeCovidLayer(active, googleMap.current)
                map.controls[window.google.maps.ControlPosition.TOP_RIGHT].clear();
            }


        });

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
    }, [])

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

    const getLegend = () => {

        // var legend = document.getElementById('legend');

        // var div = document.createElement('div');
        // div.innerHTML = '<div>the legend</div>';
        // legend.appendChild(div);

        return (
            <div id="legend">
                <h4>Legend</h4>
            </div>
        )

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