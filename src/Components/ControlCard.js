import React from 'react'
import { HiSun } from 'react-icons/hi'

export default function ControlCard(props) {


    const { lightKey, everyLightState, fetchLights, hueAddress, hueUsername } = props


    const lightStatus = () => props.lightStatus ? <HiSun className='light-on-status'/> : <HiSun className='light-off-status'/>


    const handleOnClick = (lightKey) => {
        const filtered = everyLightState.filter(light => light[0] === lightKey)
        const light = filtered[0][0]
        turnLightOn(light)
    }

    
    const turnLightOn = (light) => {
        fetch(`http://${hueAddress}/api/${hueUsername}/lights/${light}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"on": true})
        }).then(fetchLights)
    }


    const handleOffClick = (lightKey) => {
        const filtered = everyLightState.filter(light => light[0] === lightKey)
        const light = filtered[0][0]
        turnLightOff(light)
    }


    const turnLightOff = (light) => {
        fetch(`http://${hueAddress}/api/${hueUsername}/lights/${light}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"on": false})
        }).then(fetchLights)
    }
    

    return (
        <div className="control-card">
            <h2>{props.lightName}</h2>
            <h3>{lightStatus()}</h3>
            <button className='control-card-button' onClick={handleOnClick.bind(this, lightKey)}>On</button>
            <button className='control-card-button' onClick={handleOffClick.bind(this, lightKey)}>Off</button>
        </div>
    )
}

