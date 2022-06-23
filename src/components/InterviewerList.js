import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"
import PropTypes from "prop-types"


//Manages the interviewers on the selction form
 function InterviewerList(props) {
  
  const {value, onChange, interviewers} = props
  
  const interviewer = interviewers.map((interviewer) =>(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  );

}


 InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }

export default InterviewerList