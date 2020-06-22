import React from 'react'

import Sector from './Sector.jsx'

import '../css/Sector.css'

import VICImage from '../images/states/victoria-green.png'
import NSWImage from '../images/states/new-south-wales-green.png'
import WAImage from '../images/states/western-australia-green.png'
import SAImage from '../images/states/south-australia-green.png'
import TASImage from '../images/states/tasmania-green.png'
import QLDImage from '../images/states/queensland-green.png'
import NTImage from '../images/states/northern-territory-green.png'

const SectorPanel = () => {

    let covidLink = 'https://www.theage.com.au/national/covid-19-data-centre-coronavirus-by-the-numbers-20200401-p54g4w.html?permanent_redirect=true'

    let states = [
        {
            name: 'Victoria',
            sName: 'VIC',
            image: VICImage,
            trafficLink: 'https://traffic.vicroads.vic.gov.au',
            bomLink: 'http://www.bom.gov.au/vic/?ref=hdr',
            fireLink: 'https://www.emergency.vic.gov.au/respond/?=&bbox=134.912109375,-39.96870074491694,156.02783203124997,-33.11915022676886&tm=1575963431900'

        },
        {
            name: 'New South Wales',
            sName: 'NSW',
            image: NSWImage,
            trafficLink: 'https://livetraffic.com',
            bomLink: 'http://www.bom.gov.au/nsw/?ref=hdr',
            fireLink: 'https://www.rfs.nsw.gov.au/fire-information/fires-near-me'

        },
        {
            name: 'Western Australia',
            sName: 'WA',
            image: WAImage,
            trafficLink: 'https://mrw-aue-tvlmp-appsrv-prd.azurewebsites.net/Home/Map',
            bomLink: 'http://www.bom.gov.au/wa/?ref=hdr',
            fireLink: 'https://www.emergency.wa.gov.au/'

        },
        {
            name: 'South Australia',
            sName: 'SA',
            image: SAImage,
            trafficLink: 'https://www.traffic.sa.gov.au/',
            bomLink: 'http://www.bom.gov.au/sa/?ref=hdr',
            fireLink: 'https://apps.geohub.sa.gov.au/CFSMap/index.html'

        },
        {
            name: 'Tasmania',
            sName: 'TAS',
            image: TASImage,
            trafficLink: 'https://www.transport.tas.gov.au/projectsplanning/road_closures_and_delays',
            bomLink: 'http://www.bom.gov.au/tas/?ref=hdr',
            fireLink: 'http://www.fire.tas.gov.au/Show?pageId=colGMapBushfires'

        },
        {
            name: 'Queensland',
            sName: 'QLD',
            image: QLDImage,
            trafficLink: 'https://qldtraffic.qld.gov.au/',
            bomLink: 'http://www.bom.gov.au/qld/?ref=hdr',
            fireLink: 'https://publicsafetyqld.maps.arcgis.com/apps/opsdashboard/index.html#/165ed712082849fd8cd128e242090fa7'

        },
        {
            name: 'Northern Territory',
            sName: 'NT',
            image: NTImage,
            trafficLink: 'https://roadreport.nt.gov.au/road-map',
            bomLink: 'http://www.bom.gov.au/nt/?ref=hdr',
            fireLink: 'https://www.pfes.nt.gov.au/incidentmap/'

        }
    ]

    const getSectors = () => {

        // console.log("States:", states)

        return states.map((state, index) => {

            return (

                <Sector key={index} info={state} />

            )

        })

    }

    const OtherSector = () => {
        return (
            <div className='otherSector'>
                <p>Other Resources</p>
                <a href={covidLink}
                    // eslint-disable-next-line
                    target="_blank"><button className='LinkButton covid'>COVID 19 Data</button>
                </a>
            </div>
        )
    }

    return (
        <div className='SectorPanel'>
            <h1>Agency Links</h1>
            <div className='SectorList'>
                {getSectors()}<OtherSector />
            </div>
        </div>
    )
}

export { SectorPanel as default }