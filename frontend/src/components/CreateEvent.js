import React, { useState, useEffect } from 'react';
import EventAt from './EventAt';
import EventEmails from './EventEmails';
import EventMovieList from './EventMovieList';
import SearchMovies from './SearchMovies';

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emails, setEmails] = useState(['']);
  const [eventMovieList, setEventMovieList] = useState([]);

  
  
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
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data == 'success') {

        }
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

  const onEmailChange = (evt, index) => {
    evt.preventDefault();
    setEmails((prevEmails) => {
      return [...prevEmails.slice(0, index), evt.target.value, ... prevEmails.slice(index + 1)];
    });
  }

  const onAddEmailButtonClick = () => {
    setEmails((prevEmails) => [...prevEmails, '']);
  }

  console.log(emails);
  return (
    <div className="create-event-container">
      <form onSubmit={onSubmit}>
        <EventAt key="eventAt" onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
        <EventEmails key="eventEmails" emails={emails} onEmailChange={onEmailChange} onAddEmailButtonClick={onAddEmailButtonClick}/>
        <EventMovieList key="eventMovieList" eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
        <button type="submit">Create Event</button>
      </form>

      <SearchMovies key="searchMovies" addMovieButtonClick={addMovieButtonClick} eventMovieList={eventMovieList} />
    </div>

  )
}


export default CreateEvent;

<form action="/events/create-event" method="POST"></form>