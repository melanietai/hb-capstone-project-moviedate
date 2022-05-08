import useToken from './useToken';
import {
  Box,
  Image,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Spacer,
  Container
} from "@chakra-ui/react";


const MovieCard = ({ movie, disableAddMovieButton, addMovieButtonClick }) => {
  const { token } = useToken();

  let popoverHeader;
  let popoverBody;
  if (! token) {
    popoverHeader = "Log in required";
    popoverBody = "Please log in to use this feature";
  }

  const handleAddMovie = (evt) => {
    evt.preventDefault();
    addMovieButtonClick(movie);
  }

  let buttonProps = {};
  if (addMovieButtonClick) {
    buttonProps = { onClick: handleAddMovie } 
  }

  return (
    <Box key={movie.id} mt={3} borderWidth="1px" rounded="lg" overflow="hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt='popular movie poster'
      />
      <Container height="280px" bg="#16123F">
        <Box color="#FFE26A" p={3}>
          <Box fontWeight="semibold" fontSize="lg" as="h4" lineHeight="tight" >
            {movie.original_title}
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Release date:</Text>
            <Text>{movie.release_date}</Text>
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Popularity: {movie.popularity}</Text>
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Vote Average: {movie.vote_average}</Text>
          </Box>
          <Spacer />
          <Box
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            color="gray.600"
            mt={3}
          >
            <Popover placement='top-start'>
              <PopoverTrigger>
                <Button align="center" rounded="full" fontSize="xs" px="4">OVERVIEW</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Movie Title: {movie.original_title}          </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Overview: {movie.overview}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Spacer mt={2} />
            <Popover placement='top-start'>
              <PopoverTrigger>
                <Button {...buttonProps} disabled={disableAddMovieButton} align="center" rounded="full" fontSize="xs" px="4">ADD MOVIE TO EVENT</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>{popoverHeader}</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  {popoverBody}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


export default MovieCard;