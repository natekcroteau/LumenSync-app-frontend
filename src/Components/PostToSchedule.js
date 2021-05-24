import React, { useState, useEffect } from 'react'
import spacetime from 'spacetime'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import { FaRegSnowflake } from 'react-icons/fa'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import { ImFire } from 'react-icons/im'
import { HiSun } from 'react-icons/hi'


export default function PostToSchedule(props) {


    const { hueAddress, hueUsername, setSubmitted } = props


    const [availableGroups, setAvailableGroups] = useState([])
    const [timeInput, setTimeInput] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [brightness, setBrightness] = useState(50)
    const [colorTemp, setColorTemp] = useState(50)
    const [lightGroup, setLightGroup] = useState('')
    const [onOff, setOnOff] = useState(false)
     

    const handleOnOffChange = () => {
        setOnOff((prev) => !prev)
    }

    const handleNameChange = (event) => {
        setNameInput(event.target.value)
    }

    const handleLightChange = (event) => {
        setLightGroup(event.target.value)
    }

    const handleTimeChange = (event) => {
        setTimeInput(event.target.value)
    }

    const handleBrightnessChange = (event, newValue) => {
        setBrightness(newValue)
    }

    const handleColorTempChange = (event, newValue) => {
        setColorTemp(newValue)
    }

    
    const displayLightGroupOptions = () => {
        return availableGroups.map((group) => {
            return <MenuItem placeholder='Select Room' value={group[0]} key={group[0]} >{group[1].name}</MenuItem>
        })
    }


    const colorTempMarks = [
        {
            value: 0,
            label: <FaRegSnowflake className='temp-icon'/>
        },
        {
            value: 100,
            label: <ImFire className='temp-icon'/>
        }
    ]

    const brightnessMarks = [
        {
            value: 0,
            label: <HiSun className='low-brightness-icon' />
        },
        {
            value: 100,
            label: <HiSun className='high-brightness-icon' />
        }
    ]


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


    const ctPercentage = () => {
        if(colorTemp < 10){
            return '.0' + colorTemp
        }if(colorTemp > 95){
            return '1'
        }else{
            return '.' + colorTemp
        }
    }


    const prepareCT = () => {
        const ctCalculated = ctPercentage() * '347'
        return 153 + ctCalculated
    }


    const briPercentage = () => {
        if(brightness < 10){
            return '.0' + brightness
        }if(brightness > 95){
            return '1'
        }else{
            return '.' + brightness
        }
    }


    const prepareBri = () => {
        return briPercentage() * '254'
    }


    const prepareDateTime = () => {
        const date = new Date()
        const result = spacetime(date).add(1, 'month').add(1, 'day').format('{year}-{month-pad}-{date-pad}') + 'T' + timeInput + ':00'
        return result
    }
    

    const submitForm = (event) => {
        setSubmitted(true)
        event.preventDefault()
        const convertedBri = Math.trunc(prepareBri())
        const convertedCT = Math.trunc(prepareCT())
        fetch(`https://${hueAddress}/api/${hueUsername}/schedules`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": nameInput,
                "command": {
                    "address": `/api/${hueUsername}/groups/${lightGroup}/action`,
                    "method": "PUT",
                    "body": {"on": onOff, "bri": `${convertedBri}`, "ct": `${convertedCT}`}
                },
                "localtime": `${prepareDateTime()}`,
                "autodelete": false
            })
        })
    }


    useEffect(() => {
        const fetchLightGroupsToState = () => {
            fetch(`https://${hueAddress}/api/${hueUsername}/groups`, { method: 'GET' })
            .then(response => response.json())
            .then(groups => setAvailableGroups(Object.entries(groups)))
        }
        fetchLightGroupsToState()
    }, [])


    return (
        <div className='post-to-schedule'>
            <form className='schedule-form' onSubmit={submitForm} >
                <h2 >Create Automation</h2>
                <ThemeProvider theme={theme}>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        onChange={handleNameChange}
                        value={nameInput}
                        inputProps={{ maxLength: 24 }}
                    />
                    <InputLabel id="select" >Room</InputLabel>
                    <Select 
                        labelId="select-label"
                        id="select" 
                        value={lightGroup} 
                        onChange={handleLightChange}
                        variant="outlined"
                    >
                        {displayLightGroupOptions()}
                    </Select>
                    <div className='switch-grid'>
                        <Grid component="label" container alignItems="center"  spacing={1} variant="outlined">
                            <Grid item >Off</Grid>
                            <Grid item>
                                <Switch 
                                    checked={onOff}
                                    onChange={handleOnOffChange}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                    <TextField
                        id="time"
                        type="time"
                        label="Time"
                        variant="outlined" 
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                        onChange={handleTimeChange}
                        value={timeInput}
                    />
                    <InputLabel id="brightness" >Brightness</InputLabel>
                    <Slider
                        id="brightness"
                        className='slider'
                        defaultValue={50}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        marks={brightnessMarks}
                        min={0}
                        max={100}
                        value={brightness} 
                        onChange={handleBrightnessChange}
                    />
                    <InputLabel id="color-temp" >Color Temperature</InputLabel>
                    <Slider
                        id='color-temp'
                        className='slider'
                        defaultValue={50}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        marks={colorTempMarks}
                        min={0}
                        max={100}
                        value={colorTemp} 
                        onChange={handleColorTempChange}
                    />
                </ThemeProvider>
                <input type='submit' className='schedule-submit-button'></input>
            </form>  
        </div>
    )
}
