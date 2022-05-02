const useState = React.useState;
const useParams = ReactRouterDOM.useParams;
const useLocation = ReactRouterDOM.useLocation;

const ShowEvent = (props) => {
  const { token } = useToken();
  // get event from ShowEventDetails component
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


  React.useEffect(() => {
    fetch(`/api/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res != 200) {
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

  React.useEffect(() => {
    if (eventKey) {
      fetch(`/api/events/${eventKey}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setEvent(data['event']);
        setParticipants(data['participants']);
      });
    }
  }, [eventKey]);

  React.useEffect(() => {
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
      return [...prevParticipants.slice(0, index), participant, ... prevParticipants.slice(index + 1)];
    });
  };
  return (
    <div>
      <div>
        <ShowEventDetails event={event} />
      </div>
      <div>
        {participants.map(participant => <ShowParticipantStatus  key={participant.participant_id} participant={participant} />)}
      </div>
      <div>
        {participant ? <ShowUpdateRsvpForm participant={participant} eventKey={eventKey} onRsvp={onRsvp} /> : null}
      </div>
      <div>
        {/* <ShowVotingForm participants={participants} movies={movies}/> */}
      </div>
      <div>
        {/* {movies.map(movie => <ShowMovieDetails key={movie.movie_id} movies={movies}/>)} */}
      </div>
    </div>
  );
};


/* {movies.map(movie => {
  return (
    <div  key={movie.movie_id}>
      <MoviePoster apiId={movie.api_id}/>
      {/* <MovieDetails apiId={movie.api_id}/>
      <VotingStatus voteCount={movie.vote_count}/> */
    /* </div>
  )})
  } */