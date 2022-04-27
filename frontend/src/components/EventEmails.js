import React, { useState } from 'react';

const EventEmails = (props) => {

  const emails = props.emails;

  const emailsComponents = [];
  for (let i = 0; i < emails.length; i++) {
    emailsComponents.push(<input onChange={(evt) => props.onEmailChange(evt, i)} type="email" placeholder="Type email..." value={emails[i]} />)
  }

  return (
    <div className="emails-container">
        <label>
          <p>Email friend(s) that you would like to RSVP</p>
          {emailsComponents}
        </label>
        <button type="button" onClick={props.onAddEmailButtonClick}>Add another email</button>  
    </div>
  )
}


export default EventEmails;