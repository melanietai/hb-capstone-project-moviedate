import React from 'react';

const EventEmails = () => {
  return (
    <div className="emails-container">
        <label>
          <p>Email friend(s) that you would like to RSVP</p>
          <input type="email" name="friends" placeholder="Type email..." />
        </label>
        <button type="button" key="add-friend">Add another friend</button>  
    </div>
  )
}


export default EventEmails;