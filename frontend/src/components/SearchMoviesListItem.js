import React, { useState, useEffect, useRef } from 'react';

const SearchMoviesListItem = (props) => {
  // const [disabledBtn, setDisabledBtn] = useState(false);
  // const [movieIdList, setMovieIdList] = useState(['']);
  // const [movieTitleComponents, setMovieTitleComponents] = useState(['']);

  const movie = props.movie;
  const addMovieButtonClick = props.addMovieButtonClick;
  const disableAddMovieButton = props.disableAddMovieButton;


  const onSubmit = (evt) => {
    evt.preventDefault();
    //disable add movie button after click
    // setDisabledBtn(true);
    addMovieButtonClick(movie);
    // const movieTitle = evt.target.movietitle.value;
    // const movieId = evt.target.movieid.value;
    // const {myContainer} = useRef(null);
    // const removeElement = () => {
    //   myContainer.current.remove();
    //   //restore add movie buttn after movie was removed from movie list
    //   evt.target.addmoviebtn.disabled = false;
    // };
    // setMovieTitleComponents((prevMovieTitleComponents) => [...prevMovieTitleComponents, <span ref={myContainer}><li >{movieTitle}</li><input type="hidden" id="removebtn" value={`${movieId}`} />
    //   <button type="button" onSubmit={removeElement}>Remove movie</button></span>]);
    // setMovieIdList((prevMovieIdList) => [...prevMovieIdList, { movieId }]);
    
  }

  //check length of movieList; if length >=5 button.disabled=true otherwise false
  // const disabledStatus = () => {
  //   if (movieIdList.length >= 5) {
  //     setDisabledBtn(true);
  //   } else {
  //     setDisabledBtn(false);
  //   }
  // }


  return (
    <div>
      <div className="search-movies-list-item-container">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" width="100" />
        <br></br>
        Movie Title: {movie.title}
        <details id={movie.id}>
          <summary>More details</summary>
          <p>Popularity: {movie.popularity}</p>
          <p>Release date: {movie.release_date}</p>
          <p>Overview: {movie.overview}</p>
        </details>
        <form id={`add-movie-${movie.id}`} onSubmit={onSubmit}>
          <input type="hidden" id="movietitle" value={`${movie.original_title}`} />
          <input type="hidden" id="movieid" value={`${movie.id}`} />
          <button type="submit" id="addmoviebtn" disabled={disableAddMovieButton}>Add movie to RSVP</button>
        </form>
      </div>
    </div>

  );
}

export default SearchMoviesListItem;
