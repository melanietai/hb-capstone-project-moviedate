import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
} from "@chakra-ui/react";


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
    <>
      <Box bg="#FFE26A" align="center">
        <Text pt={2} fontSize="xs">(current user: {participant.email})</Text>
        <Box pb={2}>
          <form onSubmit={onSubmitButtonClick} >
            <Text pr={2}>Will you be attending?</Text>
            <input type="radio" name="btn" value="yes" id="yesbtn" onChange={handleChange} checked={rsvp == true} />
            <label htmlFor="yesbtn">Yes</label>

            <input type="radio" name="btn" value="no" id="nobtn" onChange={handleChange} checked={rsvp == false} />
            <label htmlFor="nobtn">No</label>
            <Button size="xs" type="submit" rounded="full" ml={4}>Update RSVP</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};


export default ShowUpdateRsvpForm;