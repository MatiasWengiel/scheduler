export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
    for (const singleDay of state.days) {
      if (singleDay.name === day) {
        singleDay.appointments.forEach(appt => appointmentArray.push(state.appointments[appt]))
      }
    }
  return appointmentArray
}