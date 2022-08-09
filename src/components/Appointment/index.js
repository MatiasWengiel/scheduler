import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM_DELETE = "CONFIRM_DELETE";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, mode) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props
      .saveInterview(props.id, interview, mode)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteConfirmed() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          interiewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM_DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          mode={mode}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status>Saving</Status>}
      {mode === CONFIRM_DELETE && (
        <Confirm onCancel={() => back()} onConfirm={deleteConfirmed}>
          Are you sure you wish to delete this appointment?{" "}
        </Confirm>
      )}
      {mode === DELETING && <Status>Deleting</Status>}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()}>
          Unable to delete. Please try again.
        </Error>
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()}>
          Unable to save appointment. Please try again.
        </Error>
      )}
    </article>
  );
}
