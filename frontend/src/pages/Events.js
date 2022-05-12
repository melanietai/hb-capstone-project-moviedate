import React, { useState, useEffect } from 'react';
import useToken from '../components/useToken';
import EventsListItem from '../components/EventsListItem';
import { 
  Grid,
  GridItem,
  Box,
  Container,
  Text
} from "@chakra-ui/react";

const Events = () => {
  const { token } = useToken();
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    if (token) {
      fetch('/api/events', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setEvents(data);
      });
    }
  }, [token]);


  return (
    <>
      {events.length > 0 ? (
        <Box>
          <Container pt={20} maxWidth="container.xl">
            <Box>
              <Grid templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
              }} gap={6} p={20}>
                {
                  events.map(event => <GridItem w="100%" key={event.event_id}><EventsListItem event={event} /></GridItem>)
                }
              </Grid>
            </Box>
          </Container>
        </Box>
      ) : (
        <p>You currently have no events</p>
      )}
    </>
  );
};

export default Events;