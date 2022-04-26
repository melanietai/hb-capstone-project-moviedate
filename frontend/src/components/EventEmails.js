import React from 'react';

const EventEmails = () => {

  const onClick = () => {
    const input = document.createElement("input");
    input.type = "email"
    input.name = "emails"
    input.placeholder = "Type email...";
    document.querySelector('.emails-container').appendChild(input);
    document.querySelector('.emails-container').insertAdjacentHTML('beforeend', '<br>');
  }

  return (
    <div className="emails-container">
        <label>
          <p>Email friend(s) that you would like to RSVP</p>
          <input type="email" name="emails" placeholder="Type email..." />
        </label>
        <button type="button" id="add-friend" onClick={onClick}>Add another friend</button>  
    </div>
  )
}


export default EventEmails;