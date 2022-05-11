import React, { useState, useEffect } from 'react';
import MovieCards from './MovieCards';


const TopRatedMovieCards = ({ addedMovieIds, addMovieButtonClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`/api/top-rated-movies`)
    .then(res => res.json())
    .then(data => {
      setMovies(data);
    });
  }, []);

  return (
    <MovieCards movies={movies} addedMovieIds={addedMovieIds} addMovieButtonClick={addMovieButtonClick} />
  );
};


export default TopRatedMovieCards;