import React, { useEffect, useState } from 'react'
import AccountForm from './AccountForm'
import BridgeSetup from './BridgeSetup'


export default function Account(props) {


    const { hueUsername, hueAddress, setUser, userState, setHueAddress, setHueUsername, fetchBridgeInfo } = props


    const [tokenPresent, setTokenPresent] = useState(false)
    const [submitted, setSubmitted] = useState(false) 


    const showHueSetup = () => localStorage.getItem('token') ? 
        <BridgeSetup 
            hueAddress={hueAddress} 
            hueUsername={hueUsername} 
            tokenPresent={tokenPresent}
            userState={userState}
            setHueUsername={setHueUsername}
        />: null
    

    useEffect(() => {}, [tokenPresent])
    // eslint-disable-next-line
    useEffect(fetchBridgeInfo, [])


    return (
        <div className='account-container'>
            <div className='account-component'>
                <AccountForm 
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    tokenPresent={tokenPresent}
                    setTokenPresent={setTokenPresent}
                    setUser={setUser}
                    userState={userState}
                    setHueAddress={setHueAddress}
                    setHueUsername={setHueUsername}
                    fetchBridgeInfo={fetchBridgeInfo}
                />
                {showHueSetup()}
            </div>
        </div>
    )
}
