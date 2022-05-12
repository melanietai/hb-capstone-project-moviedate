import MovieCard from './MovieCard';
import { 
  Grid,
  GridItem,
  Box
} from "@chakra-ui/react";


const MovieCards = ({ movies, addedMovieIds, addMovieButtonClick }) => {

  return(
    <> 
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
          {movies.map(movie => {
            let disableAddMovieButton = false;      
            if ((addedMovieIds.includes(movie.id)) || (addedMovieIds.length >= 5)) {
              disableAddMovieButton = true;
            }
            return <GridItem key={movie.id}><MovieCard  movie={movie} disableAddMovieButton={disableAddMovieButton} addMovieButtonClick={addMovieButtonClick} /></GridItem>
          } )}
        </Grid>
      </Box>
    </>
  )
};


export default MovieCards;