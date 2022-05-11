import React, { useState, useEffect } from 'react';
import MovieCards from './MovieCards';


const PopularMovieCards = ({ addedMovieIds, addMovieButtonClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`/api/popular-movies`)
    .then(res => res.json())
    .then(data => {
      setMovies(data);
    });
  }, []);

  return (
    <MovieCards movies={movies} addedMovieIds={addedMovieIds} addMovieButtonClick={addMovieButtonClick} />
  );
};


export default PopularMovieCards;