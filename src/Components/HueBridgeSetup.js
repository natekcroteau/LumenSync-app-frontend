import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'

export default function HueBridgeSetup(props) {

    const { userState, setHueUsername } = props

    const [bridgeIPAddress, setBridgeIPAddress] = useState('')

    const handleBridgeIPAddressChange = (event) => {
        setBridgeIPAddress(event.target.value)
    }

    const establishUsername = () => {
        fetch(`https://${bridgeIPAddress}/api`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({"devicetype": "my_hue_app#device name"})
        })
        .then(response => response.json())
        .then(results => storeBridgeInfo(bridgeIPAddress, results[0].success.username))
    }

    const storeBridgeInfo = (hueAddress, hueUsername) => {
        fetch('https://lumensync.herokuapp.com/establishBridge', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({ 'username': userState, 'hueUsername' : hueUsername, 'hueAddress' : hueAddress })
        })
        .then(setHueUsername(hueUsername))
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


    return (
        <div className='bridge-setup'>
            <div className='bridge-setup-prompt'>
                <h1>Hue Bridge Setup</h1>
                <h5>1- Navigate to the Hue App > Settings > Hue Bridges > information > Network settings.</h5>
                <h5>2- Swtich off DHCP momentarily to reveal your Hue Bridge IP address for input below. </h5>
                <h5>3- Make sure to switch DHCP back on before exiting!</h5>
                <h5>4- After you have input the IP address, press the link button atop your Hue bridge and within 30 seconds hit Connect</h5>
            </div>
            <div className="bridge-setup-input">
                <ThemeProvider theme={theme}>
                    <TextField 
                        label="IP Address" 
                        variant="outlined" 
                        onChange={handleBridgeIPAddressChange}
                        value={bridgeIPAddress}
                        inputProps={{ maxLength: 13, required: true, placeholder: "xxx.xxx.xx.xx" }}
                    />
                </ThemeProvider>
                <button className='account-button' onClick={establishUsername} >Connect</button>
            </div>
        </div>
    )
}
