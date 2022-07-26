import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewersArray = getInterviewersForDay(state, state.day)

  
  //Aliasing of state functions for changing specific parameters
  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({ ...prev, days }));
  
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
  
  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  //Creates an array of appointments for any given day
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
      key={appointment.id}
      interviewers={interviewersArray}
      interview={interview}
      bookInterview={bookInterview}
      />)
    })



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
         src="images/logo.png"
         alt="Interview Scheduler"
       />
      <hr className="sidebar__separator sidebar--centered" />
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        onChange={setDay}
        />
      </nav>


      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
