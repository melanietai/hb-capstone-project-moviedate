import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import EventsListItemDetails from './EventsListItemDetails';
import MoviePoster from './MoviePoster';


const EventsListItem = (props) => {
  const { token } = useToken();
  const event = props.event;
  const eventId = event.event_id;
  const [apiId, setApiId] = useState("");

  
  useEffect(() => {
    if (eventId) {
      fetch(`/api/movies/${eventId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movies => {
        if (movies && movies.length > 0) {
          setApiId(movies[0].api_id);
        }
      });
    }
  }, [eventId]);


  return(
    <div>
      <MoviePoster apiId={apiId}/>
      <EventsListItemDetails event={event}/>
    </div>
  );
};

export default EventsListItem;