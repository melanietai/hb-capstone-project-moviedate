import React, { useState, useEffect } from 'react';
import useToken from '../components/useToken';
import EventsListItem from '../components/EventsListItem';
import { useNavigate } from 'react-router-dom';
import { 
  Grid,
  GridItem,
  Box,
  Container,
  Text,
  Button
} from "@chakra-ui/react";




const Events = () => {
  const { token } = useToken();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  
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

  const onButtonClick = (evt) => {
    evt.preventDefault();
    navigate("/");
  };

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
        <>
          <Box>
            <Container align="center" pt={20} maxWidth="container.xl">
              <Text>You currently have no events</Text>
              <Button onClick={onButtonClick} color="#16123F" ml={4}>Click to Create Your First Event!</Button>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default Events;