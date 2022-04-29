const SearchMovies = (props) => {
  const [keyword, setKeyword] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const addMovieButtonClick = props.addMovieButtonClick;
  const eventMovieList = props.eventMovieList;

  React.useEffect(() => {
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
          const disableAddMovieButton = false;
          // replace false with condition below
          // if movie id in event movie list or event movie list count >= 5
          // pass disableAddMovieButton prop to SearchMoviesListItem
          const movieIds = [eventMovieList.map(elem => elem.id)]
          if ((movieIds.includes(movie.id)) || (eventMovieList.length > 5)) {
            disableAddMovieButton = true;
          }
          return <SearchMoviesListItem key={movie.id} disableAddMovieButton={disableAddMovieButton} movie={movie} addMovieButtonClick={addMovieButtonClick} />
        })}
      </ul>
    </div>
  )
}

