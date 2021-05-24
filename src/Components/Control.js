import React from 'react'
import ControlCard from './ControlCard'
import { useState, useEffect } from 'react'

export default function Control(props) {


    const { hueAddress, hueUsername } = props


    const [everyLight, setEveryLight] = useState([])


    const fetchLightstoState = () => {
        fetch(`https://${hueAddress}/api/${hueUsername}/lights`, { method: 'GET' })
        .then(response => response.json())
        .then(lights => {
            setEveryLight(Object.entries(lights))
        })
    }


    const showLights = () => {
        return everyLight.map( (light) => {
            return <ControlCard 
                key={light[0]}
                everyLightState={everyLight}
                lightKey={light[0]} 
                lightName={light[1].name} 
                lightStatus={light[1].state.on} 
                fetchLights={fetchLightstoState}
                hueAddress={hueAddress} 
                hueUsername={hueUsername} 
            />
       })
    }

    
    // eslint-disable-next-line
    useEffect(fetchLightstoState, [])


    return (
            <div className='control-component'>
                {showLights()}
            </div>
    )
}