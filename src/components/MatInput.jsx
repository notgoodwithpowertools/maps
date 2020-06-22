import React from 'react'

import '../css/MatInput.css'

const MatInput = (props) => {

    // allow for cases where actions or fields are not defined
    const { value, onChange = null, onFocus = null, step = null, type, required, label } = props
    
    return (

        <div className='matInput'>

            <input className='mat'

                value={value} 
                type={type} 
                step={ step ? step : null }
                onChange={(e) => { return (onChange ? onChange(e.target.value) : null) } } 
                onFocus={(e) => { return (onFocus ? onFocus('') : null) }} 
                required={required}

            />

            <label className='mat'>{label}</label>

        </div>

    )
}

export { MatInput as default }