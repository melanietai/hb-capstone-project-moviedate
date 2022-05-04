import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import SearchMoviesListItem from './SearchMoviesListItem';
import MovieScrollBar from './MovieScrollBar';


const SearchMovies = (props) => {
  const { token } = useToken();
  const [keyword, setKeyword] = useState("");
  const [keywordMovies, setKeywordMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const addMovieButtonClick = props.addMovieButtonClick;
  const eventMovieList = props.eventMovieList;

  useEffect(() => {
    console.log('fetch');
    fetch(`/api/popular-movies`)
    .then(res => res.json())
    .then(data => {
      setPopularMovies(data);
    });
  }, []);

  useEffect(() => {
    fetch(`/api/top-rated-movies`)
    .then(res => res.json())
    .then(data => {
      setTopRatedMovies(data);
    });
  }, []);


  useEffect(() => {
    if (keyword) {
      fetch('/api/search-movies', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setKeywordMovies(data)
      });
    }
  }, [keyword]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setKeyword(evt.target.keyword.value);
  }
  const movieIds = eventMovieList.map(elem => elem.id);

  return (
    <>
      <div>
        <form id="movie-keyword" onSubmit={onSubmit}>
          <input type="search" name="keyword" id="keyword" placeholder="Type keyword..." />
          <button type="submit">Search</button>
        </form>
        <ul>
          {keywordMovies.map(movie => {
            let disableAddMovieButton = false;
            // replace false with condition below
            // if movie id in event movie list or event movie list count >= 5
            // pass disableAddMovieButton prop to SearchMoviesListItem
            console.log(movieIds);
            if ((movieIds.includes(movie.id)) || (eventMovieList.length >= 5)) {
              disableAddMovieButton = true;
            }
            return <SearchMoviesListItem key={movie.id} disableAddMovieButton={disableAddMovieButton} movie={movie} addMovieButtonClick={addMovieButtonClick} />
          })}
        </ul>
        <MovieScrollBar popularMovies={popularMovies} topRatedMovies={topRatedMovies} keywordMovies={keywordMovies} />
      </div>
    </>
    
  )
};

export default SearchMovies;