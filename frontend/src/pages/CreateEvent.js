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
  Container
} from "@chakra-ui/react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emails, setEmails] = useState(['']);
  const [eventMovieList, setEventMovieList] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  console.log(`hello create event ${eventMovieList}`);
  
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
    <Flex bg="#C7DDCC" w="100%" pt={16}>
      <Box flexDirection="column" pl={20} pt={3}>
        <Box maxW='container.xl'>
          <Heading color="#75C9B7" size="lg" mb={4} pt={3}>Host a movie date and invite your friends!</Heading>
          <Text pl={6} fontSize='md' color="gray.600">
            <ul>
              <li>Step 1: Enter Event name. Select a date and time.</li><br></br>
              <li>Step 2: Enter emails of friends you would like to invite.</li><br></br>
              <li>Step 3: Search movies on the right and add up to 5 movies.</li><br></br>
              <li>Step 4: Movies added will show under "Movies added" section.</li><br></br>
              <li>Step 5: Click "Create Event" button to create event.</li><br></br>
              <li>Step 6: Your friends will receive an RSVP email with a link to the event.</li><br></br>
              <li>Step 7: You and your friends can view the event's details, change RSVP status, and vote for the movies.</li>
            </ul>
          </Text>
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
                <Box mt={2}><Button type="button" color="#90909A">Create Event</Button></Box>
              </Flex>
            </Container>
          </Flex>
        </form>
      </Box>
      <Spacer />
      <MovieScrollBar addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
    </Flex>
  </>
  
  )
};

export default CreateEvent;