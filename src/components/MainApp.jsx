import React, { useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'
// import {
//     BrowserRouter as Router,
// } from "react-router-dom"

import SectorPanel from './SectorPanel.jsx'
import GoogleMaps4 from './GoogleMaps4.js'
import EventPanel from './EventPanel.jsx'


// efc67a93a72da52608a8a96e19fd3222
// api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}

// https://api.openweathermap.org/data/2.5/weather?id=2158177&units=metric&appid=efc67a93a72da52608a8a96e19fd3222

// const events = [

//     { source: 'Weather', sev: 1, text: 'hello A', lat: -37.840935, lng: 145.946457 },
//     { source: 'Fire', sev: 2, text: 'hello B', lat: -25.281354902465942, lng: 144.5223836614914 },
//     { source: 'Traffic', sev: 3, text: 'hello C', lat: -37.840935, lng: 142.946457 },
//     { source: 'Covid', sev: 1, text: 'hello D', lat: -37.840935, lng: 144.946457 },
//     { source: 'Covid', sev: 1, text: 'hello E', lat: -32.483612724457416, lng: 146.6317586614914 },
//     { source: 'Traffic', sev: 1, text: 'hello F', lat: -30.483612724457416, lng: 146.6317586614914 },
//     { source: 'Weather', sev: 1, text: 'hello G', lat: -34.04983457894985, lng: 155.0692586614914 },
//     { source: 'Fire', sev: 2, text: 'hello H', lat: -23.281354902465942, lng: 144.5223836614914 },

// ]


const MainApp = () => {

    const [eventLoc, setEventLoc] = useState([])
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    // const [loaded, setLoaded] = useState(false)

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);

    useEffect(() => { // get map evebnt documents for the selected path/category

        console.log("MainApp useEffect (1) ...")

        const eventsCollection = firestoreDB.collection('/maps')
        setLoading(true)

        const unsubscribe = eventsCollection.onSnapshot((docSnapshot) => {
            // console.log("docSnapshot:", docSnapshot.docs)
            let parsedItems = []

            docSnapshot.docs.forEach((doc) => {

                parsedItems.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            setLoading(false)
            console.log('parsedItems:', parsedItems)
            setEvents(parsedItems)

        })
        return () => {

            // Clean up the listener subscription
            console.log("Clean up the MainApp useEffect listener subscription...")
            unsubscribe()

        }

    }, [])

    return (
        
            <div className='MainApp'>
                <SectorPanel />
                <EventPanel eventLoc={eventLoc} setEventLoc={setEventLoc}/>
                {/* <ControlsPanel onClick={setCovidLayer} covidLayer={covidLayer} /> */}
                {/* <GoogleMaps covidLayer={covidLayer} loaded={loaded} setLoaded={setLoaded}/> */}
                <GoogleMaps4 events={events} setEventLoc={setEventLoc}/>
            </div>
  
    )

}

export { MainApp as default }