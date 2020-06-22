import React, { useState } from 'react'

import Image from './Image.jsx'


const SevImage = (props) => {

    const { src, selected } = props

    const [cssClass, setCSSClass] = useState('')

    if (selected) {
      setCSSClass('SevImageSelected ')
    } else {
        setCSSClass('')
    }


    return (

        <div className={`selectedImage ${SevImageSelected}`}>
            <Image src={src} />
        </div>

    )

}

export { SevImage as default }