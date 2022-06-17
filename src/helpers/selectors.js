export function getAppointmentsForDay(state, day) {
  let array = [];
  const date = day;
  let filteredDays = state.days.filter((day) => day.name === date)[0];
  if (!filteredDays) {
    return array;
  }
  for (const appointment of filteredDays.appointments) {
    array.push(appointment);
  }

  array = array.map(appointment => state.appointments[appointment]);

 
  return array;
}

export function getInterview(state, interview) {
  const output = {};
  if (interview) {
    output["student"] = interview.student;
    output["interviewer"] = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return output;
}
