const ShowEvent = (props) => {
  const { token } = useToken();
  // get event from ShowEventDetails component
  const event = props.event;
  const eventId = event.event_id;
  const [movies, setMovies] = React.useState([]);
  
  React.useEffect(() => {
    if (eventId) {
      fetch(`/api/movies/${eventId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movies => {
        setMovies(movies);
      });
    }
  }, [eventId]);

  return (
    <div>
      <div>
        <ShowEventDetails event={event} />
      </div>
      <div>
        {/* <RsvpStatus eventParticipants={event.participants}/> */}
      </div>
      <div>
        {movies.map(movie => {
        return (
          <div>
            <MoviePoster key={movie.movie_id} apiId={movie.api_id}/>
            {/* <MovieDetails apiId={movie.api_id}/>
            <VotingStatus voteCount={movie.vote_count}/> */}
          </div>
        )})
        }
        
      </div>
    </div>
  );
};