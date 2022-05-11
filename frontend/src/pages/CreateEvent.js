import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import EventAt from '../components/EventAt';
import EventEmails from '../components/EventEmails';
import EventMovieList from '../components/EventMovieList';
import useToken from '../components/useToken';
import MovieScrollBar from '../components/MovieScrollBar';
import Footer from '../components/Footer';
import { 
  Text,
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  Container,
  OrderedList,
  ListItem
} from "@chakra-ui/react";


const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emails, setEmails] = useState(['']);
  const [eventMovieList, setEventMovieList] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();
  
  const onSubmit = (evt) => {
    evt.preventDefault();
    
    const formInputs = {
        title: title,
        date: date,
        time: time,
        emails: emails.filter((email) => email.length > 0),
        movieList: eventMovieList,
      }
    
    fetch('/api/create-event', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        navigate('../events');
      });
  }

  const onTitleChange = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
  }

  const onDateChange = (evt) => {
    evt.preventDefault();
    setDate(evt.target.value);
  }

  const onTimeChange = (evt) => {
    evt.preventDefault();
    setTime(evt.target.value);
  }

  const addMovieButtonClick = (movie) => {
    setEventMovieList((prevEventMovieList) => [...prevEventMovieList, movie])
  }

  const removeMovieButtonClick = (movie) => {
    for (let i = 0; i < eventMovieList.length; i++) {
      const movieObject = eventMovieList[i];
      if (movieObject.id == movie.id) {
          setEventMovieList((prevEventMovieList) => {
            return [...prevEventMovieList.slice(0, i), ...prevEventMovieList.slice(i + 1)]
          });
      }
    }
  }

  const onEmailChange = (email, index) => {
    setEmails((prevEmails) => {
      return [...prevEmails.slice(0, index), email, ... prevEmails.slice(index + 1)];
    });
  }

  const onAddEmailButtonClick = () => {
    setEmails((prevEmails) => [...prevEmails, '']);
  }

  return (
    <>
      <Box bg="#FAFAFA">
        <Container pt={10} maxWidth="container.xl">
          <Flex w="100%" pt={16} flexDirection={{
            sm: "column",
            md: "column",
            lg: "row"
          }}>
            <Box flexDirection="column" pl={20} pt={3}>
              <Box maxW='container.xl'>
                <Heading color="#16123F" size="lg" mb={4} pt={3}>Invite your friends to a movie date!</Heading>
                <OrderedList pl={6} fontSize='md' color="gray.600">
                  <ListItem p={2}>Enter event details and emails of friends.</ListItem>
                  <ListItem p={2}>Search movies and pick up to 5 movies.</ListItem>
                  <ListItem p={2}>Movies added will show under "Movies added" section.</ListItem>
                  <ListItem p={2}>Click "Create Event" button to create event.</ListItem>
                  <ListItem p={2}>Your friends will receive an RSVP email with a link to the event.</ListItem>
                </OrderedList>
              </Box>
              <form onSubmit={onSubmit}>
                <Flex>
                  <Box pt={10}>
                    <EventAt onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
                  </Box>
                  <Box pt={10}>
                    <EventEmails emails={emails} onEmailChange={onEmailChange} onAddEmailButtonClick={onAddEmailButtonClick}/>
                  </Box>
                  <Container ml={2} flexDirection="column" maxWidth="container.xl">
                    <Box>
                      <Text pt={10}>Movies added:</Text>
                      <Box bg="gray.200" rounded="lg" >
                        <EventMovieList eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
                        <Box py={2}></Box>
                      </Box>
                      <Flex>
                        <Spacer />
                        <Box mt={2}><Button type="submit" color="#16123F">Create Event</Button></Box>
                      </Flex>
                    </Box>
                  </Container>
                </Flex>
              </form>
            </Box>
            <MovieScrollBar addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
          </Flex>
        </Container>
      </Box>
      <Footer />
  </>
  
  )
};


export default CreateEvent;