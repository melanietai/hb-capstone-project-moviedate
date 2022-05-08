import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useToken from '../components/useToken';
import ShowEventDetails from '../components/ShowEventDetails';
import ShowParticipantStatus from '../components/ShowParticipantStatus';
import ShowUpdateRsvpForm from '../components/ShowUpdateRsvpForm';
import ShowVotingForm from '../components/ShowVotingForm';
import ShowMovieDetails from '../components/ShowMovieDetails';
import qs from 'qs';
import { 
  Container,
  Box,
  Flex
} from "@chakra-ui/react";


const ShowEvent = () => {
  const { token } = useToken();
  const [event, setEvent] = useState();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState();
  const { eventKey } = useParams();
  const { search } = useLocation();
  const [participants, setParticipants] = useState([]);

  let userEmail = null;

  if (user) {
    userEmail = user.email;
    console.log(user);
  } else if (search) {
    const query = qs.parse(search.replace('?', ''));
    console.log(query);
    userEmail = query.email;
    console.log(query.email);
  }

  console.log(userEmail);
  const participantIndex = participants.findIndex(p => p.email == userEmail);
  const participant = participants.length > 0 ? participants[participantIndex] : null;
  console.log(`PARTICIPANT: ${participant}`);

  useEffect(() => {
    fetch(`/api/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status != 200) {
          const error = new Error('no user');
          throw error;
        }
        return res.json();
      }).then(user => {
        setUser(user);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (eventKey) {
      fetch(`/api/events/${eventKey}`, {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setEvent(data['event']);
        setParticipants(data['participants']);
      });
    }
  }, [eventKey]);



  useEffect(() => {
    if (event) {
      fetch(`/api/movies/${event.event_id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movies => {
        setMovies(movies);
      });
    }
  }, [event]);

  if (!event) {
    return <div>Loading</div>;
  }

  const onRsvp = (participant) => {
    const index = participants.findIndex(p => p.participant_id == participant.participant_id);

    setParticipants((prevParticipants) => {
      return [...prevParticipants.slice(0, index), participant, ...prevParticipants.slice(index + 1)];
    });
  };

  const onVotedList = (votedList) => {
    for (const movie of votedList) {
      const index = movies.findIndex(m => m.api_id == movie.api_id);
      setMovies((prevMovies) => {
        return [...prevMovies.slice(0, index), movie, ...prevMovies.slice(index + 1)];
      })
    }
  }

  for (const movie of movies) {
    console.log(movie.vote_count);
  }

  const updateVotingStatus = (participant) => {
    const index = participants.findIndex(p => p.participant_id == participant.participant_id);

    setParticipants((prevParticipants) => {
      const newParticipant = { ...participant, voted: true };
      return [...prevParticipants.slice(0, index), newParticipant, ...prevParticipants.slice(index + 1)];
    });
  };

  return (
    <>
      <Box bg="#FAFAFA">
        <Container pt={20} maxWidth="container.xl">
          <Flex>
            <Box flexDirection="column">
              <Box>
                <ShowEventDetails event={event} />
              </Box>
              <Box mt={6}>
                {participants.map(participant => <ShowParticipantStatus key={participant.participant_id} participant={participant} />)}
              </Box>
              <Box mt={6}>
              {participant ?
                <div>
                  <ShowUpdateRsvpForm participant={participant} eventKey={eventKey} onRsvp={onRsvp} />
                </div> : null}
              </Box>
            </Box>
            <Box flexDirection="column" ml={10}>
              <Box>
                {participant ?
                <div>
                  <ShowVotingForm participant={participant} movies={movies} eventKey={eventKey} onVotedList={onVotedList} updateVotingStatus={updateVotingStatus} />
                </div> : null}
              </Box>
              <Box mt={6}>
                {movies.map(movie => <ShowMovieDetails key={movie.movie_id} movie={movie}/>)}
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
      
    </>
  );
};

export default ShowEvent;

