import React from 'react'

import '../css/SevFilterPanel.css'

import Sev1Truck from '../images/truck-red-sm.png';
import Sev2Truck from '../images/truck-yellow-sm.png'
import Sev3Truck from '../images/truck-green-sm.png'
import Image from './Image.jsx'

const SevFilterPanel = (props) => {

    const { eventLevel, setEventLevel } = props

    const handleClick = () => {

        // console.log("SevFilterPanel click ...", count);

        (eventLevel < 3) ? setEventLevel(eventLevel + 1) : setEventLevel(1)

    }

    const setImage = () => {
        switch (eventLevel) {
            case 3: 
                return Sev3Truck
            case 2: 
                return Sev2Truck
            default: 
                return Sev1Truck
            
        }
    }

    return (

        <div className='SevFilterPanel'>
            <p>Business event display level</p>  
            <div onClick={() => handleClick()} >
                <Image src={setImage()} />
            </div>
        </div>

    )

}

export { SevFilterPanel as default }