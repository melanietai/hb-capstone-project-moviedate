import React from 'react';

const SearchMoviesListItem = (props) => {
  const movie = props.movie

  return (
    <li>
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" width="100"/>
      {movie.title}
    </li>
  );
}

export default SearchMoviesListItem;
