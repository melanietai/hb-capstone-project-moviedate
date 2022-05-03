import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SearchMovies from '../components/SearchMovies';
import EventAt from '../components/EventAt';
import EventEmails from '../components/EventEmails';
import EventMovieList from '../components/EventMovieList';
import useToken from '../components/useToken';


const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emails, setEmails] = useState(['']);
  const [eventMovieList, setEventMovieList] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  console.log('hello create event');
  
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
    <div className="create-event-container">
      <p>Search for movies to watch with your friends. Add up to 5 movies to your event.</p>
      <SearchMovies addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
      <form onSubmit={onSubmit}>
        <EventAt onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
        <EventEmails emails={emails} onEmailChange={onEmailChange} onAddEmailButtonClick={onAddEmailButtonClick}/>
        <EventMovieList eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
        <button type="submit">Create Event</button>
      </form>
    </div>

  )
};

export default CreateEvent;