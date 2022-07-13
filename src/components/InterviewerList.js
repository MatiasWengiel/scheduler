import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem.js";

export default function InterviewerList(props) {
  const interviewersArray = props.interviewers.map(prop => <InterviewerListItem key={prop.id} id={prop.id} name={prop.name} avatar={prop.avatar} selected={props.interviewer === prop.id} setInterviewer={props.setInterviewer}/>)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
          {interviewersArray}
      </ul>
    </section>
  );
}