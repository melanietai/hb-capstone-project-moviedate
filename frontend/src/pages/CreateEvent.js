import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import EventAt from '../components/EventAt';
import EventEmails from '../components/EventEmails';
import EventMovieList from '../components/EventMovieList';
import useToken from '../components/useToken';
import MovieScrollBar from '../components/MovieScrollBar';
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
    console.log(formInputs);
    
    fetch('/create-event', {
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
          <Flex w="100%" pt={16}>
            <Box flexDirection="column" pl={20} pt={3}>
              <Box maxW='container.xl'>
                <Heading color="#16123F" size="lg" mb={4} pt={3}>Invite your friends to a movie date!</Heading>
                <OrderedList pl={6} fontSize='md' color="gray.600">
                  <ListItem p={2}>Enter event details.</ListItem>
                  <ListItem p={2}>Enter emails of friends you would like to invite.</ListItem>
                  <ListItem p={2}>Search movies on the right and add up to 5 movies.</ListItem>
                  <ListItem p={2}>Movies added will show under "Movies added" section.</ListItem>
                  <ListItem p={2}>Click "Create Event" button to create event.</ListItem>
                  <ListItem p={2}>Your friends will receive an RSVP email with a link to the event.</ListItem>
                </OrderedList>
              </Box>
              <form onSubmit={onSubmit}>
                <Flex>
                  <Box pt={10}>
                    <EventAt onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
                    <EventEmails emails={emails} onEmailChange={onEmailChange} onAddEmailButtonClick={onAddEmailButtonClick}/>
                  </Box>
                  <Container ml={10} flexDirection="column" maxWidth="container.xl">
                    <Text pt={10}>Movies added:</Text>
                    <Box bg="gray.200" rounded="lg" >
                      <EventMovieList eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
                      <Box py={5}></Box>
                    </Box>
                    <Flex>
                      <Spacer />
                      <Box mt={2}><Button type="submit" color="#90909A">Create Event</Button></Box>
                    </Flex>
                  </Container>
                </Flex>
              </form>
            </Box>
            <Spacer />
            <MovieScrollBar addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
          </Flex>
        </Container>
      </Box>
  </>
  
  )
};


export default CreateEvent;