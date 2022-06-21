import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  console.log("state", state);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    // console.log("day1", day1);
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
     const days = updateSpots(state, appointments)
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
   
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments)
      setState({ ...state, appointments, days });
    });
  }

  const updateSpots = function (state, appointments, id) {
    const dayObj = state.days.find((d) => d.name === state.day);

    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = { ...dayObj, spots };
    const days = state.days.map((day) => (day.name === state.day ? newDay : day));

    return days;
  };

  return { bookInterview, cancelInterview, setDay, state,  };
}
