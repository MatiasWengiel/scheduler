import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index";


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(res =>  setDays(res.data))
  }, [])

  const appointmentArray = Object.values(appointments).map(appointment => 
    <Appointment 
    key={appointment.id}
    {...appointment}
    />)

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
        days={days}
        day={day}
        onChange={setDay}
        />
      </nav>


      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
