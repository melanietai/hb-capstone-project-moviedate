import React, { useState, useEffect } from 'react';
import SearchMoviesListItem from './SearchMoviesListItem';

const SearchMovies = (props) => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const addMovieButtonClick = props.addMovieButtonClick;

  useEffect(() => {
    if (keyword) {
      fetch('/api/search-movies', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setMovies(data)
      });
    }
  }, [keyword]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setKeyword(evt.target.keyword.value);
  }

  return (
    <div>
      <form id="movie-keyword" onSubmit={onSubmit}>
        <input type="search" name="keyword" id="keyword" placeholder="Type keyword..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => {
          const disableAddMovieButton = false; // replace false with condition below
          // if movie id in event movie list or event movie list count >= 5
          // pass disableAddMovieButton prop to SearchMoviesListItem

          return <SearchMoviesListItem key={movie.id} disableAddMovieButton={disableAddMovieButton} movie={movie} addMovieButtonClick={addMovieButtonClick} />
        })}
      </ul>
    </div>
  );
}

export default SearchMovies;
