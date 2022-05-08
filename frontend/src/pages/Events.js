import React, { useState, useEffect } from 'react';
import useToken from '../components/useToken';
import EventsListItem from '../components/EventsListItem';
import { 
  Grid,
  GridItem,
  Box,
  Container
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
      <Box bg="#FAFAFA">
        <Container pt={20} maxWidth="container.xl">
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} p={20}>
              {
                events.map(event => <GridItem w="100%"><EventsListItem key={event.event_id} event={event} /></GridItem>)
              }
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Events;