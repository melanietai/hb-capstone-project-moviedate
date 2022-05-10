import {
  Box,
  Text,
  Container
} from "@chakra-ui/react";


const ShowParticipantStatus = (props) => {
  const participant = props.participant;

  let participantRole;
  if (participant.is_host === true) {
    participantRole = <Text fontWeight="bold">Host:</Text>
  } else {
    participantRole = <Text fontWeight="bold">Invitee:</Text>
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
    votingStatus = <span>Voted</span>
  } else {
    votingStatus = <span>Not yet voted</span>
  }

  return(
    <>
      <Box>
        <Container bg="#FFE26A" pt={2}>
          <Box fontSize="xl" color="16123F">{participantRole}</Box>
          <Box color="16123F">
            <Text>{participant.email}</Text>
            <Text>RSVP status: {rsvpStatus}</Text>
            <Text>Voting status: {votingStatus}</Text>
          </Box>
        </Container>
      </Box>
    </>
  );
};


export default ShowParticipantStatus;