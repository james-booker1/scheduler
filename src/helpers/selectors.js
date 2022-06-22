
// Getts appointment for that day 
export function getAppointmentsForDay(state, day) {
  let dayobj = state.days.find((d) => d.name === day);
  if (!dayobj) {
    return [];
  }

  return dayobj.appointments.map((id) => state.appointments[id]);
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}
//Gets interviewers for that day
export function getInterviewersForDay(state, day) {
  let dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) {
    return [];
  }
  return dayObj.interviewers.map((id) => state.interviewers[id]);
} 


