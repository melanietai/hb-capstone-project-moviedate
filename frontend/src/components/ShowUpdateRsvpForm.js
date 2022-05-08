import React, { useState } from 'react';


const ShowUpdateRsvpForm = (props) => {
  const { participant, eventKey, onRsvp } = props;
  const [rsvp, setRsvp] = useState(participant.RSVP);

  const handleChange = (evt) => {
    setRsvp(evt.target.value == 'yes');
  }
  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    fetch(`/events/${eventKey}/rsvp`, {
      method: 'PUT',
      body: JSON.stringify({ email: participant.email, rsvp }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        onRsvp(data);
      });
  };


  return (
    <div>
      <p>Update your RSVP status:</p>
      <form onSubmit={onSubmitButtonClick} >
        Will you be attending?
        <input type="radio" name="btn" value="yes" id="yesbtn" onChange={handleChange} checked={rsvp == true} />
        <label htmlFor="yesbtn">Yes</label>

        <input type="radio" name="btn" value="no" id="nobtn" onChange={handleChange} checked={rsvp == false} />
        <label htmlFor="nobtn">No</label>
        <button type="submit">Update RSVP</button>
      </form>
    </div>
  );
};


export default ShowUpdateRsvpForm;