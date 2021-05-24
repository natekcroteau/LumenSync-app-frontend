import React, { useEffect } from 'react'
import CurrentScheduleCard from './CurrentScheduleCard'


export default function CurrentSchedule(props) {


    const { schedules, fetchSchedules, hueAddress, hueUsername } = props


    const showSchedules = () => {
        return schedules.map( (schedule) => {
            return <CurrentScheduleCard
                key={schedule[0]}
                scheduleKey={schedule[0]}
                schedulesState={schedules}
                scheduleName={schedule[1].name}
                scheduleTime={schedule[1].time}
                scheduleCommandBody={schedule[1].command.body}
                fetchSchedules={fetchSchedules}
                hueAddress={hueAddress} 
                hueUsername={hueUsername}  
            />
        })
    }

    
    // eslint-disable-next-line
    useEffect(fetchSchedules, [schedules])


    return (
        <div className='current-schedule-container'>
            <h2>Current Schedules</h2>
            <div className='current-schedule'>
                {showSchedules()}
            </div>
        </div>
    )
}
