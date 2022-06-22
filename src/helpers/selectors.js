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

export function getInterviewersForDay(state, day) {
  let dayObj = state.days.find((d) => d.name === day);

  if (!dayObj) {
    return [];
  }
  return dayObj.interviewers.map((id) => state.interviewers[id]);
} 

// export function getInterviewersForDay(state, day) {
//   const dayList = state.days.filter((d) => d.name === day);

//   if (dayList.length === 0) {
//     return [];
//   }
//   const filteredList = dayList[0].interviewers.map(
//     (d) => state.interviewers[d]
//   );
//   return filteredList;
// }
