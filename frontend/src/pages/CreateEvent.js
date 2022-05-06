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
  Heading
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
    <Flex w="100%" pt={16}>
      <Box position="top" flexDirection="column" pl={16}>
        <Box maxW='container.xl'>
          <Heading mb={4}>Host a movie date and invite your friends!</Heading>
          <Text pl={6} fontSize='sm' color="gray.600">
            <ul>
              <li>Step 1: Enter Event name. Select a date and time.</li>
              <li>Step 2: Enter emails of friends you would like to invite.</li>
              <li>Step 3: Search movies on the right and add up to 5 movies.</li>
              <li>Step 4: Movies added will show under "Movies added" section.</li>
              <li>Step 5: Click "Create Event" button to create event.</li>
              <li>Step 6: Your friends will receive an RSVP email with a link to the event.</li>
              <li>Step 7: You and your friends can view the event's details, change RSVP status, and vote for the movies.</li>
            </ul>
          </Text>
        </Box>
        <form onSubmit={onSubmit}>
          <EventAt onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
          <EventEmails emails={emails} onEmailChange={onEmailChange} onAddEmailButtonClick={onAddEmailButtonClick}/>
          <EventMovieList eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
          <button type="submit">Create Event</button>
        </form>
      </Box>
      <Spacer />
      <MovieScrollBar addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
    </Flex>
  </>
  
  )
};

export default CreateEvent;