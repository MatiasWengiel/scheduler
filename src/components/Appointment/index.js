import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from '../../hooks/useVisualMode';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function cancelInterview() {
    transition(DELETING)
    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
      {mode === SAVING && <Status>Saving</Status>}
      {mode === DELETING && <Status>Deleting</Status>}
      {mode === SHOW && (<Show
        interiewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={cancelInterview}
        />
      )}
      {mode === CREATE && (<Form 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={() => back()}
        />
        
      )}
    </article>
  )
}