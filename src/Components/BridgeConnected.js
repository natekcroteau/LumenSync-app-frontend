import React from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'

export default function BridgeConnected(props) {

    const { hueAddress } = props

    const connectedOrNot = () => {
        if(hueAddress === null){
            return <>
                <h2>Bridge Not Connected</h2>
                <FaRegThumbsDown  />
                <h3>Follow the setup instructions below to get started!</h3>  
            </>
        }else{
            return <>
                <h2>Bridge Connected</h2>
                <FaRegThumbsUp  />            
                <h3>IP Address: {hueAddress}</h3>
            </>
        }
    }

    return (
        <div className='bridge-connected-component'>
            {connectedOrNot()}
        </div>
    )
}
