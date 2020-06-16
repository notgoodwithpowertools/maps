import React, { useState, useEffect, useRef } from 'react';

// Variables
const MAP_API_KEY = process.env.REACT_APP_MAPS_KEY;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const GOOGLE_MAP_API_KEY = 'AIzaSyAgdDYc2aXaaPerb9PE839wOdWPukk75Ac';
const myLocation = {
    // Aus
    // lat: -28.045364573164893, 
    // lng: 135.946457
    // Melbourne
    lat: -37.3308252885144,
    lng: 145.27956485083416

    // lat: -25.6980,
    // lng: 134.8807
};

// styles
const mapStyles = {
    width: '100%',
    height: '600px',
};

const VicPolyCoordinates = [

    { lat: -38.46560736052953, lng: 141.01044824758762 },
    { lat: -39.23281080059153, lng: 146.43592856965734 },
    { lat: -37.53555836321738, lng: 150.05192489038927 },
    { lat: -36.000, lng: 148.313 },
    { lat: -35.000, lng: 148.006 },
    { lat: -36.000, lng: 146.920 },
    { lat: -36.000, lng: 146.920 },
    { lat: -33.753, lng: 140.997 },

]

const NswPolyCoordinates = [

    { lat: -37.53555836321738, lng: 150.05192489038927 },
    { lat: -36.000, lng: 148.313 },
    { lat: -35.000, lng: 148.006 },
    { lat: -36.000, lng: 146.920 },
    { lat: -36.000, lng: 146.920 },
    { lat: -33.753, lng: 140.997 },
    { lat: -29.000, lng: 141.000 },
    { lat: -28.208, lng: 154.240 },

];


// const setEventsCounts = () => {
//     new google.maps.Polygon({ paths: VicPoly });

//     google.maps.event.addListener(map, 'click', function (e) {
//         var resultColor =
//             google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?
//                 'blue' :
//                 'red';

//     }
// }

const events = [

    { source: 'Weather', sev: 1, text: 'hello A', lat: -37.840935, lng: 145.946457 },
    { source: 'Fire', sev: 2, text: 'hello B', lat: -25.281354902465942, lng: 144.5223836614914 },
    { source: 'Traffic', sev: 3, text: 'hello C', lat: -37.840935, lng: 142.946457 },
    { source: 'Covid', sev: 1, text: 'hello D', lat: -37.840935, lng: 144.946457 },
    { source: 'Covid', sev: 1, text: 'hello E', lat: -32.483612724457416, lng: 146.6317586614914 },
    { source: 'Traffic', sev: 1, text: 'hello F', lat: -30.483612724457416, lng: 146.6317586614914 },
    { source: 'Weather', sev: 1, text: 'hello G', lat: -34.04983457894985, lng: 155.0692586614914 },
    { source: 'Fire', sev: 2, text: 'hello H', lat: -23.281354902465942, lng: 144.5223836614914 },

]

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

    // const { covidLayer, loaded, setLoaded } = props


    // console.log("covidLayer:", covidLayer)

    const [showCovidData, setShowCovidData] = useState(false)

    // console.log("WEATHER API KEY:", WEATHER_API_KEY)
    // console.log("MAPS KEY:", MAP_API_KEY)
    // refs
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);

    const [vicEventsCount, setVicEventsCount] = useState(0)
    const [nswEventsCount, setNswEventsCount] = useState(0)
    const [otherEventsCount, setOtherEventsCount] = useState(0)
    // const [weatherEventsCount, setWaetherEventsCount] = useState(0)




    // helper functions
    const createGoogleMap = () => {

        const map = new window.google.maps.Map(googleMapRef.current, {
            zoom: 8,
            center: {
                lat: myLocation.lat,
                lng: myLocation.lng
            }
        });

        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var covidControlDiv = document.createElement('div');
        var covidControl = new CovidControl(covidControlDiv, map);
        covidControlDiv.index = 1;
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(covidControlDiv);
        map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));



        console.log("Map:", map)
        // var trafficLayer = new window.google.maps.TrafficLayer();
        // trafficLayer.setMap(map);
        // Add a listener for the click event
        window.google.maps.event.addListener(map, 'click', function (event) {
            // addLatLngToPoly(event.latLng, poly);
            console.log("Map clicked...")

            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude);
            getInfoforLocation(latitude, longitude)

        });

        return map

    }

    // const LayerOverlay = new google.maps.OverlayView();

    const createTrafficLayer = () => {
        var trafficLayer = new window.google.maps.TrafficLayer();
        return trafficLayer
    }

    const createTransitLayer = () => {
        var transitLayer = new window.google.maps.TransitLayer();
        return transitLayer
    }

    const createInfoWindow = (content) => {
        var infowindow = new window.google.maps.InfoWindow({
            content: content

        })
        return infowindow
    }

    // const checkEvents = () => {
    //     google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?

    // }

    // const createMarker = () => {
    //     const marker = new window.google.maps.Marker({
    //         position: { lat: myLocation.lat, lng: myLocation.lng },
    //         map: googleMap.current,
    //         title: "Hello World!"

    //     });
    //     const infowindow = createInfoWindow()
    //     marker.addListener('click', function () {
    //         infowindow.open(googleMap.current, marker);
    //         console.log("Banana")
    //     });

    //     return marker

    // }

    const getInfoforLocation = (lat, lng) => {

        console.log("Weather at this location...", lat + ' : ' + lng)

    }

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

    const createMarker = (event) => {
        const marker = new window.google.maps.Marker({
            position: { lat: event.lat, lng: event.lng },
            map: googleMap.current,
            title: event.source
            ,
            icon: pinSymbol(getColor(event.source))

        });
        const infowindow = createInfoWindow(event.text)
        marker.addListener('click', function () {
            infowindow.open(googleMap.current, marker);
            console.log(event.text)
        });

        return marker

    }

    function CovidControl(controlDiv, map) {

        let covidDisplay = false

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
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.textContent = 'Covid Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function () {
            //   map.setCenter(chicago);
            console.log("Clicked ++ ...")
            covidDisplay ? covidDisplay = false : covidDisplay = true
            console.log("covidDisplay:", covidDisplay)
            // loadCovid(map, covidDisplay)
            setShowCovidData(true)

        });

    }

    const Get = (yourUrl) => {
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    /** Loads the state boundary polygons from a GeoJSON source. */
    const loadCovid = (map, showLayer) => {

        // if (showLayer === true ) {


        map.data.loadGeoJson('https://opendata.arcgis.com/datasets/b81aeb7bc2914fa5868e6a961040065a_0.geojson');
        // var json_obj = JSON.parse(Get('https://opendata.arcgis.com/datasets/b81aeb7bc2914fa5868e6a961040065a_0.geojson'));
        // map.data.addGeoJson(json_obj);

        // wait for the request to complete by listening for the first feature to be
        // added
        window.google.maps.event.addListenerOnce(map.data, 'addfeature', function () {

            console.log("Covid layer loaded...")
            map.data.setStyle((feature) => {

                let numCases = feature.getProperty('Cases')
                if (numCases > 0) {

                    if (numCases < 9)
                        return ({
                            fillColor: 'yellow'

                        });
                    else {
                        if (numCases < 19)
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
    if (covidLayer === 0) {
        // else {
        console.log("loadCovid remove:", showLayer)
        // console.log("loadCovid:", map.data)
        // map.data.setMap(null)
        // console.log("Fature removed...")

        window.google.maps.event.addListenerOnce(map.data, 'removefeature', () => {
            console.log("Fature removed...")
        })
    }


}

/** Loads the state boundary polygons from a GeoJSON source. */
const loadMapShapes = (map) => {
    // load US state outline polygons from a GeoJson file
    // map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE' });
    // VIC
    map.data.loadGeoJson('https://data.gov.au/geoserver/vic-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_b90c2a19_d978_4e14_bb15_1114b46464fb&outputFormat=json', { idPropertyName: 'STATE' });
    // NSW
    map.data.loadGeoJson('https://data.gov.au/geoserver/nsw-state-boundary/wfs?request=GetFeature&typeName=ckan_a1b278b1_59ef_4dea_8468_50eb09967f18&outputFormat=json', { idPropertyName: 'STATE' });
    // TAS
    map.data.loadGeoJson('https://data.gov.au/geoserver/tas-state-boundary/wfs?request=GetFeature&typeName=ckan_cf2ebc53_1633_4c5c_b892_bfc3945d913b&outputFormat=json', { idPropertyName: 'STATE' });
    // ACT
    map.data.loadGeoJson('https://data.gov.au/geoserver/act-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_83468f0c_313d_4354_9592_289554eb2dc9&outputFormat=json', { idPropertyName: 'STATE' });
    // WA
    map.data.loadGeoJson('https://data.gov.au/geoserver/wa-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_5c00d495_21ba_452d_ae46_1ad0ca05e41f&outputFormat=json', { idPropertyName: 'STATE' });
    // SA
    map.data.loadGeoJson('https://data.gov.au/geoserver/sa-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_8f996b8c_d939_4757_a231_3fec8cb8e929&outputFormat=json', { idPropertyName: 'STATE' });
    // NT
    map.data.loadGeoJson('https://data.gov.au/geoserver/nt-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_5162e11c_3259_4894_8b9e_f44540b6cb11&outputFormat=json', { idPropertyName: 'STATE' });
    // QLD
    map.data.loadGeoJson('https://data.gov.au/geoserver/qld-state-boundary-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_2dbbec1a_99a2_4ee5_8806_53bc41d038a7&outputFormat=json', { idPropertyName: 'STATE' });



    // wait for the request to complete by listening for the first feature to be
    // added
    window.google.maps.event.addListenerOnce(map.data, 'addfeature', function () {
        // google.maps.event.trigger(document.getElementById('census-variable'),
        //     'change');
        console.log("State boundaries loaded...")
    });
}

const addListenerOnPolygon = (polygon) => {
    window.google.maps.event.addListener(polygon, 'click', function (event) {
        console.log("Polygon clicked:", polygon)
        // alert(polygon.indexID);
    });
}

// const VicPoly = window.google.maps.Polygon({
//     paths: VicPolyCoordinates,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 2
// });

const createPoly = (coords, color) => {

    let aPoly = new window.google.maps.Polygon({
        paths: coords,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    aPoly.addListener('click', (event) => {
        console.log("Poly clicked:", + event.latLng.lat() + ',' + event.latLng.lng())
        // infoWindow.setContent(contentString);
        // infoWindow.setPosition(event.latLng);

    })

    return aPoly

}

const drawVicPoly = (map) => {

    let VicPoly = createPoly(VicPolyCoordinates, 'blue')
    VicPoly.setMap(map);
    const VIC = { name: 'Victoria', sName: 'VIC', poly: VicPoly }
    return VIC


}

const drawNSWPoly = (map) => {

    // let NSWPoly = new window.google.maps.Polygon({
    //     paths: NswPolyCoordinates,
    //     strokeColor: 'green',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // });

    let NSWPoly = createPoly(NswPolyCoordinates, 'green')
    NSWPoly.setMap(map);
    const NSW = { name: 'New South Wales', sName: 'NSW', poly: NSWPoly }

    return NSW

}

// const getState = (lat, lng) => {

//     console.log("getState...lat:", lat + ' lng:', lng)
//     let aPoint =  window.google.maps.LatLng(lat, lng)
//     console.log("aPoint:", aPoint)
//     const inState = window.google.maps.geometry.poly.containsLocation(aPoint, VicPoly)
//     console.log("in State?:", inState)

//     // calc state from polygon

//     // switch (stateCode) {
//     //   case 
//     // }

//     return 'Victoria'


// }

const getState = (aPoint, statesArray) => {

    let stateName = 'OTHER'

    for (let state of statesArray) {
        const inState = window.google.maps.geometry.poly.containsLocation(aPoint, state.poly)
        if (inState) {
            stateName = state.sName
            break
        }
    }
    return stateName
}



// statesArray.forEach( (state, index) => {

//    console.log("Evaluating point in", state.sName + ':' + inState)
//    if (inState) return state.sName 
//    else return 'OTHER'
// })

const processEvents = (statesPolysArray) => {

    console.log("Process events...")
    let vicEvents = 0
    let nswEvents = 0
    let otherEvents = 0

    events.forEach((event, index) => {
        console.log("eventMarker:", event)

        createMarker(event)

        let aPoint = new window.google.maps.LatLng(event.lat, event.lng)
        console.log("aPoint:", aPoint)

        let stateName = getState(aPoint, statesPolysArray)
        console.log("caluclated state:", stateName)
        switch (stateName) {
            case 'VIC': {
                vicEvents++
                break
            }
            case 'NSW': {
                nswEvents++
                break
            }
            default: otherEvents++

        }

    })
    setVicEventsCount(vicEvents)
    setNswEventsCount(nswEvents)
    setOtherEventsCount(otherEvents)
    // console.log("Events count:" + count + " locations: VIC:", vicEventsCount + ' ,NSW:', nswEventsCount + ' Other:', otherEventsCount)

}

const createCovidLayer = (map) => {
    covidLayer.loadGeoJson('https://opendata.arcgis.com/datasets/b81aeb7bc2914fa5868e6a961040065a_0.geojson');

}

const createStatePolys = (map) => {

    let statePolys = []

    statePolys.push(drawVicPoly(map))
    statePolys.push(drawNSWPoly(map))
    return statePolys

}

// useEffect Hook
useEffect(() => {

    // if (!loaded) {

    //     console.log("Loaded:", loaded)
    if (!window.google) {

        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places,geometry`
        console.log("googleMapScript.src:", googleMapScript.src)
        window.document.body.appendChild(googleMapScript);
        // setLoaded(true)

        // }
        // else {
        //     console.log("Already loaded:", loaded)
        // }


        googleMapScript.addEventListener('load', () => {
            googleMap.current = createGoogleMap();
            // marker.current = createMarker();

            // loadMapShapes(googleMap.current)

            createTrafficLayer().setMap(googleMap.current)
            createTransitLayer().setMap(googleMap.current)

            createCovidLayer().setMap(googleMap.current)
            // createStatePolys(googleMap.current)

            // processEvents(createStatePolys(googleMap.current))
            // loadCovid2(googleMap.current)


        })
    }
}, [covidLayer]);

return (
    <div>
        {/* <div>events count Vic: {vicEventsCount}</div>
            <div>events count NSW: {nswEventsCount}</div>
            <div>events count Other: {otherEventsCount}</div> */}
        <div
            id="google-map"
            ref={googleMapRef}
            style={mapStyles}
        />
    </div>
)

        

export { GoogleMaps as default }