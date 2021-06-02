import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'



export default function AccountForm(props) {

    const { setTokenPresent, setSubmitted, submitted, setUser, setHueAddress, setHueUsername, userState } = props


    const [desiredUsername, setDesiredUsername] = useState('')
    const [desiredPassword, setdesiredPassword] = useState('')
    

    const handleUsernameChange = (event) => {
        setDesiredUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setdesiredPassword(event.target.value)
    }


    const signUpUser = () => {
        setSubmitted(true)
        fetch('http://localhost:3001/users', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user: {"username": desiredUsername, "password": desiredPassword}})
        })
    }


    const logInUser = () => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ user: {"username": desiredUsername, "password": desiredPassword}})
        }).then(response => response.json())
        .then(results => {
            setUser(results.user[1].username)
            localStorage.setItem("token", results.token)
            setTokenPresent(true)
            setSubmitted(null)
        })
    }


    const signNewUserIn = () => submitted ? <h2>Success, sign in!</h2>: null


    const logOutUser = () => {
        localStorage.removeItem('token')
        setUser(null)
        setTokenPresent(false)
        setHueAddress(null)
        setHueUsername(null)
    }


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#292c35"
            },
            secondary: {
                main: "#292c35"
            }
        }
    })

    const whatToShowANewUser = () => localStorage.getItem('token') ? 
        <>
            <button variant="contained" className='account-button' onClick={logOutUser} >Log Out</button>  
        </> :
        <>
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    onChange={handleUsernameChange}
                    value={desiredUsername}
                    inputProps={{ maxLength: 12, required: true, placeholder: "username" }}
                />
                <TextField 
                    type='password'
                    label="Password" 
                    variant="outlined" 
                    onChange={handlePasswordChange}
                    value={desiredPassword}
                    inputProps={{ maxLength: 12, required: true, placeholder: "password" }}
                />
            </ThemeProvider>
            <button className='account-button' onClick={logInUser} >Log In</button>
            <button className='account-button' onClick={signUpUser} >Sign Up</button>
        </>


    return (
        <div className='account-form-container'>
            <div className='account-form' >
                {signNewUserIn()}
                {whatToShowANewUser()}
            </div>
        </div>
    )
}
