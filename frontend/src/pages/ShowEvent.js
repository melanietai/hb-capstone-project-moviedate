import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../components/useToken';
import ShowEventDetails from '../components/ShowEventDetails';
import ShowParticipantStatus from '../components/ShowParticipantStatus';
import ShowUpdateRsvpForm from '../components/ShowUpdateRsvpForm';
import ShowVotingForm from '../components/ShowVotingForm';
import ShowMovieDetails from '../components/ShowMovieDetails';
import Footer from '../components/Footer';
import qs from 'qs';
import { 
  Container,
  Box,
  Grid,
  GridItem,
  Button,
  Heading,
  Spacer,
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
  const navigate = useNavigate();

  let userEmail = null;

  if (user) {
    userEmail = user.email;
  } else if (search) {
    const query = qs.parse(search.replace('?', ''));
    userEmail = query.email;
  }

  const participantIndex = participants.findIndex(p => p.email == userEmail);
  const participant = participants.length > 0 ? participants[participantIndex] : null;

  useEffect(() => {
    fetch(`/api/user/profile`, {
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

  const onDeleteButtonClick = (evt) => {
    evt.preventDefault();

    fetch(`/api/events/${eventKey}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
        navigate('/events');
    });
  }

  return (
    <>
      <Box bg="#FAFAFA" pt={10}>
        <Container pt={20} pl={20} pr={20} maxWidth="container.xl">
          <Box borderWidth={4} borderColor="#75C9B7">
            <ShowEventDetails event={event} />
          </Box>
          <Box>
            <Box flexDirection="column" align="center">
              <Heading size="md" mt={6} mb={2}>Participants Information:</Heading>
              <Grid templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }} gap={4} align="center">
                {participants.map(participant => <GridItem key={participant.participant_id}><ShowParticipantStatus  participant={participant} /></GridItem>)}
              </Grid>
            
              <Box mt={6}>
              <Heading size="md" mb={2}>Update your RSVP status: </Heading>
              {participant ?
                <div>
                  <ShowUpdateRsvpForm participant={participant} eventKey={eventKey} onRsvp={onRsvp} />
                </div> : null}
              </Box>
            </Box>
          </Box>
            <Heading size="md" mt={6} mb={2} align="center">Please vote for the movie(s) you would like to watch together:</Heading>
            <Box flexDirection="column">
                <Box bg="#16123F">
                  <Grid templateColumns={{
                      sm: "repeat(2, 1fr)",
                      md: "repeat(5, 3fr)",
                    }} gap={0} align="center">
                    {movies.map(movie => <Flex align="center"><GridItem key={movie.movie_id}><ShowMovieDetails  movie={movie}/></GridItem></Flex>)}
                  </Grid>
                </Box>
                <Box>
                  {participant ?
                  <div>
                    <ShowVotingForm participant={participant} movies={movies} eventKey={eventKey} onVotedList={onVotedList} updateVotingStatus={updateVotingStatus} />
                  </div> : null}
                </Box>
              </Box>
        </Container>
        <Box align="center">
          <Button onClick={onDeleteButtonClick} rounded="full" fontSize="sm" m={4}>Delete this event</Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ShowEvent;

