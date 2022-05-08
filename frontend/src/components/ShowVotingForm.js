import React, { useState } from 'react';
import ShowMovieTitle from './ShowMovieTitle';


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

    fetch(`/events/${eventKey}/vote-update`, {
      method: 'POST',
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
      <div>
        <form onSubmit={onSubmitButtonClick}>
          Which movie(s) do you vote for?
          {apiIds.map(apiId => {
          return(
            <div key={apiId}>
              <input type="checkbox" name="movies" value={apiId} id={apiId} onChange={handleChange}/>
              <label htmlFor={apiId}>{<ShowMovieTitle apiId={apiId} />}</label>
            </div>
            );
          })}
          <button type="submit">Submit Votes</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {message}
    </div>
  );
};


export default ShowVotingForm;