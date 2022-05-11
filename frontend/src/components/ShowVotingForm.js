import React, { useState } from 'react';
import ShowMovieTitle from './ShowMovieTitle';
import {
  Box,
  Button,
  Text
} from "@chakra-ui/react";


const ShowVotingForm = (props) => {
  const { participant, movies, eventKey, onVotedList, updateVotingStatus } = props;
  const [apiIdList, setApiIdList] = useState([]);
  const apiIds = [];

  for (const movie of movies) {
    apiIds.push(movie.api_id);
  }

  const handleChange = (evt) => {
    const val = evt.target.value;
    setApiIdList((prevapiIdList) => [...prevapiIdList, val]);
  }

  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    fetch(`/api/events/${eventKey}/vote-update`, {
      method: 'PUT',
      body: JSON.stringify({ "apiIdList": apiIdList, "participantId": participant.participant_id }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(`response: ${data}`);
        onVotedList(data);
        updateVotingStatus(participant);
      });
  };

  let message;
  if (participant.voted === true) {
    message = (<div>You have successfuly voted! Thank you!</div>);
  } else {
    message = (
      <>
        <Box bg="#FFE26A" align="center">
          <Box pb={2}>
            <form onSubmit={onSubmitButtonClick}>
              <Text pt={2}>Which movie(s) do you vote for?</Text>
              {apiIds.map(apiId => {
              return(
                <div key={apiId}>
                    <input type="checkbox" name="movies" value={apiId} id={apiId} onChange={handleChange}/>
                    <label htmlFor={apiId}>{<ShowMovieTitle apiId={apiId} />}</label>
                </div>
                );
              })}
              <Button size="xs" type="submit" rounded="full" m={4}>Submit Vote(s)</Button>
            </form>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <div>
      {message}
    </div>
  );
};


export default ShowVotingForm;