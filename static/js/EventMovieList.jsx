const EventMovieList = (props) => {
  const eventMovieList = props.eventMovieList;
  const removeMovieButtonClick = props.removeMovieButtonClick;

  return (
    <div className="movie-list-container">
      <p>Movies added</p>
      <ol>
        {eventMovieList.map(movie => <EventMovieListItem key={movie.id} movie={movie} removeMovieButtonClick={removeMovieButtonClick} />)}
      </ol>
    </div>
  )
}

