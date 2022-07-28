import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  //Set blank state on load (to be updated with data retrieved from server below)
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Aliasing of state functions for changing specific parameters
  const setDay = day => setState(prev => ({...prev, day}));

  useEffect(() => {
    //Retrieves data from API and uploads state accordingly
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then ((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, []);

  function setSpots(id) {
    console.log('in setSpots')
    let spotsCounter = 0
    let appointmentDay = null;

    //Find the day for the appointment
    for (const day in state.days) {
      if (state.days[day].appointments.includes(id)) {
        appointmentDay = day
      }
    }

    //Check the state of each appointment slot in the chosen day
    for (const appointment of state.days[appointmentDay].appointments) {
      if (state.appointments[appointment].interview === null) {
        spotsCounter++
      }
    }
    console.log('Spots calculated: ', spotsCounter)
    const updatedSpots = {
      ...state.days,
      spots: spotsCounter
    }

    return setState(prev => ({...prev, updatedSpots}))
  }

  function updateSpots(requestType) {
    const days = state.days.map(day => {
      if (day.name === state.day) {
        if (requestType === "bookAppointment") {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return { ...day }
      }
    })
    return days
  }

  //Books a new interview or updates an existing one
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
  
 
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {

      const days = updateSpots('bookAppointment')
      setState(prev => ({...prev, appointments, days }))
    })
    // .then(() => setSpots(id))
    }

  //Cancels an existing interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() =>{
      const days = updateSpots()
       setState({ ...state, appointments, days })
      })
    
  }

  return { state, setDay, bookInterview, cancelInterview, setSpots }
}