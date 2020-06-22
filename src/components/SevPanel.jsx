import React from 'react'

// import Sev3Truck from '../images/truck-green.png'
// import Sev2Truck from '../images/truck-yellow.png'
import Sev1Truck from '../images/truck-red.png'

import SevImage from './Image.jsx'

import '../css/SevPanel.css'

const SevPanel = ( props ) => {

    

    return (

        <div className='SevPanel'>
            <div className='SevPanelImages' >
                {/* <SevImage src={Sev1Truck} />
                <SevImage src={Sev2Truck} selected={true}/> */}
                <SevImage src={Sev1Truck} />
            </div>
        </div>
    )
}

export { SevPanel as default }