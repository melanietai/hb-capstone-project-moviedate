import React, { useState, useEffect } from 'react';
import EventAt from './EventAt';
import EventEmails from './EventEmails';
import EventMovieList from './EventMovieList';
import SearchMovies from './SearchMovies';

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [emails, setEmails] = useState([]);
  const [eventMovieList, setEventMovieList] = useState([]);

  const formInputs = {
    title: title,
    date: date,
    time: time,
    // emails: emails,
    movieList: eventMovieList,
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
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
    // setMovieList(evt.target.movies-added.value);
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
    //setEventMovieList();
  }

  return (
    <div className="create-event-container">
      <form onSubmit={onSubmit}>
        <EventAt onTitleChange={onTitleChange} onTimeChange={onTimeChange} onDateChange={onDateChange} />
        <EventEmails />
        <EventMovieList eventMovieList={eventMovieList} removeMovieButtonClick={removeMovieButtonClick} />
      </form>
      <button type="submit">Create Event</button>
      <SearchMovies addMovieButtonClick={addMovieButtonClick} />
    </div>

  )
}


export default CreateEvent;

<form action="/events/create-event" method="POST"></form>