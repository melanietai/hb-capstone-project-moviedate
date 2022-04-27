import React from 'react';

const SearchMoviesListItem = (props) => {
  const movie = props.movie

  const movieList = [];

  const onSubmit = (evt) => {
    evt.preventDefault();

  }

  return (
    <div className="search-movies-list-item-container">
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" width="100"/>
      <br></br>
      Movie Title: {movie.title}
      <details id={movie.id}>
        <summary>More details</summary>
        <p>Popularity: {movie.popularity}</p>
        <p>Release date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
      </details>
      <form id={`add-movie-${movie.id}`} onSubmit={onSubmit}>
        <input type="hidden" class="movie-name" value={`${movie.original_title}`} />
        <button type="submit" class="add-movie-btn">Add movie to RSVP</button>
      </form>
    </div>
  );
}

export default SearchMoviesListItem;
