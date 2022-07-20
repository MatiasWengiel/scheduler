export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
    for (const singleDay of state.days) {
      if (singleDay.name === day) {
        singleDay.appointments.forEach(appt => appointmentArray.push(state.appointments[appt]))
      }
    }
  return appointmentArray
}

export function getInterview(state, interview) {
  // interview has student, interviewer OR null
  if (interview === null) return null;

  for (const chosenInterviewer in state.interviewers) {
    if (chosenInterviewer === interview.interviewer.toString()) {
      return {...interview, interviewer: state.interviewers[chosenInterviewer]}
    }

  }

}