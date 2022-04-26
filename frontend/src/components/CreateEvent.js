import React, { useState, useEffect } from 'react';
import EventAt from './EventAt';
import EventEmails from './EventEmails';
import EventMovieList from './EventMovieList';
import SearchMovies from './SearchMovies';

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [emails, setEmails] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const formInputs = {
    title: title,
    date: date,
    time: time,
    emails: emails,
    movieList: movieList,
  }

  useEffect(() => {
    if (title, date, time, emails, movieList) {
      fetch('/api/create-event', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {'Content-Type': 'application/json'
        },
      })
    .then (res => res.json())
    .then (data => {
      if (data == 'success') {
      
      }
    });
    }
  }, []);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.title.value);
    setDate(evt.target.name.value);
    setTime(evt.target.time.value);
    setEmails(evt.target.mails.value);
    setMovieList(evt.target.movies-added.value);
  }
  
  return (
    <div className="create-event-container">
      <form onSubmit={onSubmit}>
        <EventAt />
        <EventEmails />
        <EventMovieList />
      </form>
      <button type="submit">Create Event</button>
      <SearchMovies />
    </div>

  )
}


export default CreateEvent;

<form action="/events/create-event" method="POST"></form>