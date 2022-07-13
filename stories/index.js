import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
//Imports DayList component and subcomponent
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
//Imports InterviewerList component and subcomponent
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

//Imports Appointment component and subcomponents
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => <DayListItem name="Tuesday" setDay={() => action("setDay")("Tuesday")} spots={5} />)

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("onChange")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("onChange")} />
  ))
  .add("Wednesday", () => (
      <DayList days={days} day={"Wednesday"} setDay={action("onChange")} />
  ));

  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  
  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => action("setInterviewer")(interviewer.id)}
      />
    ));

    const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onClick={action("setInterviewer")}
    />
  ));

  storiesOf("Appointment", module)
    .addParameters({
      backgrounds: [{ name: "white", value: "#fff", default: true }]
    })
    .add("Appointment", () => <Appointment />)
    .add("Appointment with Time", () => <Appointment time="12pm"/>)
    .add("Header", () => <Header time="12pm" />)
    .add("Empty", () => <Empty onAdd={action("onAdd")} />)
    .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewers[0]} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
    .add("Confirm", () => <Confirm message="Delete the appointment?"  onCancel={action("onCancel")} onConfirm={action("onConfirm")}/>)
    .add("Status", () => <Status message="Deleting" />)
    .add("Error", () => <Error message="Could not delete appointment" onClose={action("onClose")} />)
    .add("Form Create", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
    .add("Form Edit", () => <Form interviewer={1} interviewers={interviewers} student="Matias Wengiel" onSave={action("onSave")} onCancel={action("onCancel")} />)