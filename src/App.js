import './App.css'
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

import Logo from './Components/Logo'
import Title from './Components/Title'
import Account from './Components/Account'
import Control from './Components/Control'
import Schedule from './Components/Schedule'



export default function App() { 
    

    const [hueUsername, setHueUsername] = useState(null)
    const [hueAddress, setHueAddress] = useState(null)
    const [user, setUser] = useState(null)


    const userPresent = () => !user ? localStorage.removeItem('token') : null
    userPresent()

    
    const fetchBridgeInfo = () => {
        if(!user){
            return null
        }else{
            fetch('https://lumensync.herokuapp.com/user', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": user })
            })
            .then(response => response.json())
            .then(user => {
                setHueUsername(user.hueUsername)
                setHueAddress(user.hueAddress)
            })
        }
    }
    

    const userReady = () => {
        if( !hueAddress || !hueUsername ){
            return null
        }else{
            return <>
                <li>
                    <Link className='sidebar-list-item' to='/control'>Control</Link>
                </li>
                <li>
                    <Link className='sidebar-list-item' to='/schedule'>Schedule</Link>
                </li>
            </>
        }
    }


    useEffect(fetchBridgeInfo, [user, hueUsername])

    
    return (
        <div className='app'>
            <Logo />
            <Title />
            <Router>
            <div className='sidebar-component'>
                <nav className='nav'>
                    <ul className='sidebar-list'>
                        <li>
                            <Link className='sidebar-list-item' to='/account'>Account</Link>
                        </li>
                    {userReady()}
                    </ul>
                </nav>
            </div>
                <Switch>
                    <Route path='/account'>
                        <Account 
                            hueAddress={hueAddress} 
                            hueUsername={hueUsername}
                            setUser={setUser} 
                            setHueAddress={setHueAddress}
                            setHueUsername={setHueUsername}
                            userState={user}
                            fetchBridgeInfo={fetchBridgeInfo}
                        />
                    </Route>
                    <Route path='/control'>
                        <Control 
                            hueAddress={hueAddress} 
                            hueUsername={hueUsername} 
                        />
                    </Route>
                    <Route path='/schedule'>
                        <Schedule 
                            hueAddress={hueAddress} 
                            hueUsername={hueUsername}  
                        />
                    </Route>
                    <Route path='/'>
                        <Account 
                            hueAddress={hueAddress} 
                            hueUsername={hueUsername}
                            setUser={setUser} 
                            setHueAddress={setHueAddress}
                            setHueUsername={setHueUsername}
                            userState={user}
                            fetchBridgeInfo={fetchBridgeInfo}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
