import React from 'react';

const EventAt = () => {
  return (
    <div className="event-at-container">
        <label>
          <p>Event name</p>
          <input type="text" name="title" required />
        </label>
        <label>
          <p>Select a date</p>
          <input type="date" name="date" required />
        </label>
        <label>
          <p>Select a time</p>
          <input type="time" name="time" required />
        </label>
    </div>
  )
}


export default EventAt;