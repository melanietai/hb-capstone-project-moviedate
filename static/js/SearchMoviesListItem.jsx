const SearchMoviesListItem = (props) => {
  const movie = props.movie;
  const addMovieButtonClick = props.addMovieButtonClick;
  const disableAddMovieButton = props.disableAddMovieButton;


  const onSubmit = (evt) => {
    evt.preventDefault();
    addMovieButtonClick(movie);

  };

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
  )
}


