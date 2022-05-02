const ShowParticipantStatus = (props) => {
  const participant = props.participant;

  let hostMsg;
  if (participant.is_host === true) {
    hostMsg = <span>(host)</span>
  } else {
    hostMsg = <span></span>
  }

  let rsvpStatus;
  if (participant.RSVP === null) {
    rsvpStatus = <span>Awaiting response</span>
  } else if (participant.RSVP === false) {
    rsvpStatus = <span>Not attending</span>
  } else {
    rsvpStatus = <span>Attending</span>
  }

  let votingStatus;
  if (participant.voted === true) {
    votingStatus = <span>Voted!</span>
  } else {
    votingStatus = <span>Please vote!</span>
  }

  return(
    <div>
      <ul>
        <li>
          Participant email: {participant.email} {hostMsg}<br></br>
          RSVP status: {rsvpStatus}<br></br>
          Voting status: {votingStatus}<br></br>
        </li>
      </ul>
    </div>
  );
};