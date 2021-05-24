import React, { useState, useEffect } from 'react'
import CurrentSchedule from './CurrentSchedule'
import PostToSchedule from './PostToSchedule'


export default function Schedule(props) {


    const { hueAddress, hueUsername, theme } = props
    
    
    const [everySchedule, setEverySchedule] = useState([])
    const [submitted, setSubmitted] = useState(null)


    const fetchSchedulestoState = () => {
        fetch(`https://${hueAddress}/api/${hueUsername}/schedules`, { method: 'GET' })
        .then(response => response.json())
        .then(schedules => setEverySchedule(Object.entries(schedules)))
    }


    useEffect(() => {
        fetchSchedulestoState()
            return () => {
                setSubmitted(null)
            }
        },
        [submitted]
    )


    return (
            <div className='schedule-component'>
                <PostToSchedule 
                    theme={theme}
                    fetchSchedules={fetchSchedulestoState} 
                    hueAddress={hueAddress} 
                    hueUsername={hueUsername} 
                    submitted={submitted}     
                    setSubmitted={setSubmitted}     
                />
                <CurrentSchedule 
                    schedules={everySchedule} 
                    fetchSchedules={fetchSchedulestoState} 
                    hueAddress={hueAddress} 
                    hueUsername={hueUsername}      
                />
            </div>
    )
}