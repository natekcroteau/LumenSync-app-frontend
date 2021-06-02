import React from 'react'
import spacetime from 'spacetime'
import { HiSun } from 'react-icons/hi'

export default function CurrentScheduleCard(props) {


    const { scheduleKey, schedulesState, scheduleName, scheduleTime, fetchSchedules, scheduleCommandBody, hueAddress, hueUsername } = props
    const { on, bri, ct } = scheduleCommandBody


    const timeString = scheduleTime.toString().split('T')[1]
    let convertedTime = spacetime().time(timeString).goto('utc/gmt-12').time()
    

    const handleDeleteClick = (scheduleKey) => {
        const filtered = schedulesState.filter(schedule => schedule[0] === scheduleKey)
        const schedule = filtered[0][0]
        deleteSchedule(schedule)
    }


    const deleteSchedule = (schedule) => {
        fetch(`http://${hueAddress}/api/${hueUsername}/schedules/${schedule}`, { method: 'DELETE' })
        .then(fetchSchedules)
    }


    const displayEnabled = () => on === true ? <HiSun className='enabled-on-status'/> :  <HiSun className='enabled-off-status'/>


    const displayBri = () => {
        return `Brightness: ${Math.round(((bri/254) * 100)) + '%'}`
    }
    

    const displayCT = () => {
        return `Color Temp: ${Math.round(((ct - 153)/347) * 100) + '%'}`
    }
    
    
    return (
        <div className='schedule-card'>
            <h2 className='schedule-name'>{scheduleName}</h2>
            <h3 className='schedule-time'>{convertedTime}</h3>
            <h4 className='schedule-enabled'>{displayEnabled()}</h4>
            <h4 className='schedule-bri'>{displayBri()}</h4>
            <h4 className='schedule-ct'>{displayCT()}</h4>
            <button className='schedule-card-button' onClick={handleDeleteClick.bind(this, scheduleKey)} >Delete</button>
        </div>
    )
}
