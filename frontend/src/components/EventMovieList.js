import React from 'react';

const EventMovieList = (props) => {
  
  
  
  const movieIdList = [].push(props.movieId);
  const movieTitle = props.movieTitle;

  return (
    <div className="movie-list-container">
      <p>Movies added</p>
      <ol id="movies-added" value={`${movieIdList}`}>
        <li>{movieTitle}</li>
      </ol>
    </div>
  )
}


export default EventMovieList;