const EventMovieListItem = (props) => {
  const movie = props.movie;
  const removeMovieButtonClick = props.removeMovieButtonClick;

  const onClick = (evt) => {
    evt.preventDefault();
    removeMovieButtonClick(movie);
  }
  
  return (
    <li>{movie.title}<button onClick={onClick}>Remove Me</button></li>
  )
}

