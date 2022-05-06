import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import EventsListItemDetails from './EventsListItemDetails';
import MoviePoster from './MoviePoster';
import { 
  Box,
  Container,
  Stack
} from "@chakra-ui/react";

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
    <>
      <Box
        p={4}
        maxWidth="20rem"
        borderWidth={4}
        borderColor="#ABD699"
        margin={2}
      >
        <MoviePoster apiId={apiId}/>
        <Stack>
          <EventsListItemDetails event={event}/>
        </Stack>
      </Box>
    </>
  );
};

export default EventsListItem;