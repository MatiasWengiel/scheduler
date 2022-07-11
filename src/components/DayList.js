import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const dayListItemArray = props.days.map(day => 
    <DayListItem key={day.key} name={day.name} spots={day.spot} selected={day.name === props.day} setDay={props.setDay} />)

  return (
    <ul>{dayListItemArray}</ul>
  )
}