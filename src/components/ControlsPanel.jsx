import React from 'react'

import '../css/ControlsPanel.css'

const ControlsPanel = (props) => {

    const { onClick, covidLayer } = props

    const panelClick = () => {

        covidLayer ? onClick(0) : onClick(1)

    }



    return (

        <div className='ControlsPanel' onClick={(e) => { return (onClick ? panelClick(e) : null) }}>
            CovidLayer
            {/* <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
            </label> */}
        </div>
    )

}

export { ControlsPanel as default }