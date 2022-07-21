//Takes the list of appointments from state and the chosen day, and returns an array of only the appointments for that day
export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
    for (const singleDay of state.days) {
      if (singleDay.name === day) {
        singleDay.appointments.forEach(appt => appointmentArray.push(state.appointments[appt]))
      }
    }
  return appointmentArray
}

//Takes the interviewers data from state, and for a given interview returns the interview with the name (rather than number) of the interviewer
export function getInterview(state, interview) {
  if (interview === null) return null;

  for (const chosenInterviewer in state.interviewers) {
    if (chosenInterviewer.id === interview.interviewer.id) {
      return {...interview, interviewer: state.interviewers[chosenInterviewer]}
    }

  }

}