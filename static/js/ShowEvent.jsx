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
  } else if (search) {
    const query = Qs.parse(search.replace('?', ''));
    userEmail = query.email;
  }
  console.log(userEmail);
  console.log(eventKey);

  React.useEffect(() => {
    fetch(`/api/profile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(user => {
      setUser(user);
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
      }).then(res => res.json()).then(event => {
        setEvent(event);
        setParticipants(event.participants);
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
  
  return (
    <div>
      <div>
        <ShowEventDetails event={event} />
      </div>
      <div>
        {participants.map(participant => <ShowParticipantStatus key={participant.participant_id} participant={participant} event={event} />)}
      </div>
      <div>
        <ShowUpdateRsvpForm participants={participants} userEmail = {userEmail}/>
      </div>
      <div>
        <ShowVotingForm participants={participants} movies={movies}/>
      </div>
      <div>
        {movies.map(movie => <ShowMovieDetails key={movie.movie_id} movies={movies}/>)}
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