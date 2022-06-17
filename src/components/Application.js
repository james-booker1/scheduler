import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (app) => {
      const interview = getInterview(state, app.interview);
      return (
        <Appointment
          key={app.id}
          id={app.id}
          time={app.time}
          interview={interview}
        />
      );
    }
  );
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{dailyAppointments}</section>
    </main>
  );
}
