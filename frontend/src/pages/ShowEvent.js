import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useToken from '../components/useToken';
import ShowEventDetails from '../components/ShowEventDetails';
import ShowParticipantStatus from '../components/ShowParticipantStatus';
import ShowUpdateRsvpForm from '../components/ShowUpdateRsvpForm';
import ShowVotingForm from '../components/ShowVotingForm';


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
    const query = Qs.parse(search.replace('?', ''));
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
    <div>
      <div>
        <ShowEventDetails event={event} />
      </div>
      <div>
        {participants.map(participant => <ShowParticipantStatus key={participant.participant_id} participant={participant} />)}
      </div>
      <div>
        {participant ?

          <div>
            <ShowUpdateRsvpForm participant={participant} eventKey={eventKey} onRsvp={onRsvp} />
            <ShowVotingForm participant={participant} movies={movies} eventKey={eventKey} onVotedList={onVotedList} updateVotingStatus={updateVotingStatus} />
          </div> : null}


      </div>
      <div>
        {/* {movies.map(movie => <ShowMovieDetails key={movie.movie_id} movies={movies}/>)} */}
      </div>
    </div>
  );
};

export default ShowEvent;

