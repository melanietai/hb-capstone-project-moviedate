import React from 'react';

const EventAt = (props) => {
  // const { onTitleChange, onDateChange, onTimeChange } = props; 

  return (
    <div className="event-at-container">
        <label>
          <p>Event name</p>
          <input onChange={props.onTitleChange} type="text" name="title" required />
        </label>
        <label>
          <p>Select a date</p>
          <input onChange={props.onDateChange} type="date" name="date" required />
        </label>
        <label>
          <p>Select a time</p>
          <input onChange={props.onTimeChange} type="time" name="time" required />
        </label>
    </div>
  )
}


export default EventAt;