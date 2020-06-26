import React, { useState } from 'react'

import Image from './Image.jsx'


const SevImage = (props) => {

    // const { src, selected=true } = props
    const { src } = props

    // const [cssClass, setCSSClass] = useState('')

    // if (selected) {
    //   setCSSClass('SevImageSelected ')
    // } else {
    //     setCSSClass('SevImageDisabled')
    // }


    return (

        <div /* className={cssClass} */>
            <Image src={src} />
        </div>

    )

}

export { SevImage as default }