
import React, { useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'
import { filterEvents2 } from '../utils/events.js'

import SevFilterPanel from './SevFilterPanel.jsx'
import SectorPanel from './SectorPanel.jsx'
import GoogleMaps from './GoogleMaps.js'
import EventPanel from './EventPanel.jsx'


const MainApp = () => {

    const [eventLevel, setEventLevel] = useState(3)
    const [eventLoc, setEventLoc] = useState([])
    // const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])

    const filterEvents = (parsed_events) => {

        console.log("filterEvents...eventLevel:", eventLevel + ' events:', parsed_events)
        let myEvents = parsed_events.filter((event) => {

            console.log("filtering", event.sev)
            return (event.sev <= eventLevel)

        })
        console.log("myEvents:", myEvents)
        setFilteredEvents(myEvents)
    }

    useEffect(() => { // get map evebnt documents for the selected path/category

        console.log("MainApp useEffect (1) ...")

        const eventsCollection = firestoreDB.collection('/maps')
        // setLoading(true)

        const unsubscribe = eventsCollection.onSnapshot((docSnapshot) => {
            // console.log("docSnapshot:", docSnapshot.docs)
            let parsedItems = []

            docSnapshot.docs.forEach((doc) => {

                parsedItems.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            // setLoading(false)
            console.log('parsedItems:', parsedItems)
            setEvents(parsedItems)
            // setFilteredEvents(parsedItems)
            filterEvents(parsedItems)

        })
        return () => {

            // Clean up the listener subscription
            console.log("Clean up the MainApp useEffect listener subscription...")
            unsubscribe()

        }

    }, [])

    useEffect(() => {

        console.log("MainApp useEffect (2)...")
        console.log("eventLevel changed to ... ", eventLevel)
        filterEvents(events)
        console.log("eventLevel changed to ... ", eventLevel)

    }, [eventLevel])

    const showFilteredEvents = () => {
        console.log("showFilteredEvents ...", filteredEvents)
    }

    return (

        <div className='MainApp'>
            <SectorPanel />
            <EventPanel eventLoc={eventLoc} setEventLoc={setEventLoc} />
            <SevFilterPanel eventLevel={eventLevel} setEventLevel={setEventLevel} />
            <GoogleMaps events={filteredEvents} setEventLoc={setEventLoc} />

        </div>

    )

}

export { MainApp as default }