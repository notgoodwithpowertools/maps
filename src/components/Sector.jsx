import React from 'react'

import Image from './Image.jsx'

const Sector = (props) => {

    const { info } = props

    return (

        <>
            <div className='SectorItem'>{info.name}
            <Image src={info.image}/>
            <a href={info.trafficLink}
               // eslint-disable-next-line
              target="_blank"><button className='LinkButton roads'>State Roads</button>
            </a>
            <a href={info.bomLink}
               // eslint-disable-next-line
              target="_blank"><button className='LinkButton weather'>State Weather</button>
            </a>
            <a href={info.fireLink}
               // eslint-disable-next-line
              target="_blank"><button className='LinkButton fire'>State Emergency</button>
            </a>
            </div>

        </>

    )

}

export { Sector as default }

