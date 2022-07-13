import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const dayListItemArray = props.days.map(day => 
    <DayListItem 
      key={day.id} 
      name={day.value} 
      spots={day.spots} 
      selected={day.value === props.day} 
      setDay={() => props.onChange(day.value)} 
    />)

  return (
    <ul>{dayListItemArray}</ul>
  )
}