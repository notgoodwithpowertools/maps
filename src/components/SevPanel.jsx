import React from 'react'

import Sev3Truck from '../images/truck-green.png'
import Sev2Truck from '../images/truck-yellow.png'
import Sev1Truck from '../images/truck-red.png'

import Image from './Image.jsx'

import '../css/SevPanel.css'

const SevPanel = ( props ) => {

    const { sev, setSev } = props
    console.log("SevPanel sev:", sev)


    // const [ sev, setSev ] = useState(3)

    // const setSev = 

    const onClick = () => {

        (sev === 3) ? setSev(1) : setSev(sev+1)

    }

    const getImage = () => {
        switch (sev) {
            case 3: {
                return Sev3Truck
            }
            case 2: {
                return Sev2Truck
            }
            default: {
                return Sev1Truck
            }
        }
    }

    

    return (

        <div className='SevPanel' >
            <div className='SevPanelImages' onClick={(e) => onClick()} >
                {/* <SevImage src={Sev1Truck} />
                <SevImage src={Sev2Truck} selected={true}/> */}
                <Image src={getImage()} />
            </div>
        </div>
    )
}

export { SevPanel as default }