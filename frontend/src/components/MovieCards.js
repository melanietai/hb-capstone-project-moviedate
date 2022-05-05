import MovieCard from './MovieCard';

const MovieCards = ({ movies, addedMovieIds, addMovieButtonClick }) => {

  return(
    <> 
      {movies.map(movie => {
        let disableAddMovieButton = false;      
        if ((addedMovieIds.includes(movie.id)) || (addedMovieIds.length >= 5)) {
          disableAddMovieButton = true;
        }
        return <MovieCard key={movie.id} movie={movie} disableAddMovieButton={disableAddMovieButton} addMovieButtonClick={addMovieButtonClick} />
      } )}
    </>
  )
};

export default MovieCards;