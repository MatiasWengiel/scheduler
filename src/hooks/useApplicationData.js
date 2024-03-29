import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  //Set blank state on load (to be updated with data retrieved from server below)
  const [state, dispatch] = useReducer(reducer, initialState);

  //Aliasing of state functions for changing specific parameters
  const setDay = (day) => dispatch({ type: "SET_DAY", day });

  useEffect(() => {
    //Retrieves data from API and uploads state accordingly
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  //Updates spots remaining info in sidebar
  function updateSpots(mode) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (mode === "CREATE") {
          return { ...day, spots: day.spots - 1 };
        } else if (mode === "DELETE") {
          return { ...day, spots: day.spots + 1 };
          //If not create or delete, it must be edit
        } else {
          return { ...day };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  }

  //Saves an interview PUTs info to server. Works for both booking a new interview and editing an existing one
  function saveInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = { ...state.appointments, [id]: appointment };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(mode);
        dispatch({ type: SET_INTERVIEW, appointments, days });
      });
  }

  //Cancels an existing interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots("DELETE");
        dispatch({ type: SET_INTERVIEW, appointments, days });
      });
  }

  return { state, setDay, saveInterview, cancelInterview };
}
