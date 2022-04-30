const EventsListItem = (props) => {
  const { token } = useToken();
  const event = props.event;
  const eventId = event.event_id;
  const [apiId, setApiId] = React.useState("");

  
  React.useEffect(() => {
    if (eventId) {
      fetch(`/api/movies/${eventId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movies => {
        setApiId(movies[0].api_id);
      });
    }
  }, [eventId]);


  return(
    <div>
      <MoviePoster apiId={apiId}/>
      <EventDetails event={event}/>
    </div>
  );


};