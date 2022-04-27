import React, { useState } from 'react';

const EventEmails = () => {
  const [emails, setEmails] = useState(['']);

  const onEmailChange = (evt, index) => {
    evt.preventDefault();
    setEmails((prevEmails) => prevEmails[index] = evt.target.value);
  }

  const onClick = () => {
    setEmails((prevEmails) => [...prevEmails, '']);
  }

  const emailsComponents = [];
  for (let i = 0; i < emails.length; i++) {
    emailsComponents.push(<input onChange={(evt) => onEmailChange(evt, i)} type="email" name="emails" placeholder="Type email..." value={emails[i]} />)
  }
  return (
    <div className="emails-container">
        <label>
          <p>Email friend(s) that you would like to RSVP</p>
          {emailsComponents}
        </label>
        <button type="button" id="add-friend" onClick={onClick}>Add another friend</button>  
    </div>
  )
}


export default EventEmails;