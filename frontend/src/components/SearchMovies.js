import React, { useState, useEffect } from 'react';
import SearchMoviesListItem from './SearchMoviesListItem';

const SearchMovies = () => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (keyword) {
      fetch('/api/search-movies', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setMovies(data);
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
        {movies.map(movie => <SearchMoviesListItem key={movie.id} movie={movie} />)}
      </ul>
    </div>
  );
}

export default SearchMovies;
