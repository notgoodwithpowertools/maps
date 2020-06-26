import React, { useState } from 'react'

import { addEvent } from '../utils/db-actions.js'

import MatInput from './MatInput.jsx'
import SevPanel from './SevPanel.jsx'
import MatButton from './MatButton.jsx'

import '../css/EventPanel.css'

const EventPanel = ( props ) => {

    const { eventLoc, setEventLoc } = props
    const [evComments, setEvComments] = useState('')
    const [sev, setSev] = useState(1)

    // console.log("EventLoc:", eventLoc)

    const reset = () => {
        setEvComments('')
        setEventLoc([])
        setSev(1)
    }

    const disableButton = () => {

        // const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
        // console.log("test:", regex.test(value))

        return ((evComments !== "") && (eventLoc.length !== 0)) ? false : true

    }
    const buttonAction = () => {

        console.log(`Add Event ...sev 1, Comment:${evComments}, Lat:${eventLoc[0]}, Lng:${eventLoc[1]}`)

        addEvent(sev, evComments, eventLoc[0], eventLoc[1])
        reset()

    }
    
    return (

        <div className='EventPanel'>
            
            <p>Click map to add event location...</p>
            <p>{eventLoc[0]} , {eventLoc[1]}</p>
            <SevPanel setSev={setSev} sev={sev}/>
            <MatInput type={"textarea"} label={"Comments"} required value={evComments} onChange={setEvComments} />  
            <MatButton text='Add!' onClick={buttonAction} disabled={disableButton()}/>
        </div>

    )

}

export { EventPanel as default }