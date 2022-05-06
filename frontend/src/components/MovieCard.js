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
  PopoverBody
} from "@chakra-ui/react";

const MovieCard = ({ movie, disableAddMovieButton, addMovieButtonClick }) => {
  const { token } = useToken();

  let popoverHeader;
  let popoverBody;
  if (token) {
    popoverHeader = "Sucessfully Added!";
    popoverBody = "Movie added to your event's movie list";
  } else {
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
      <Box color="#FDA300" p={3}>
        <Box fontWeight="semibold" fontSize="lg" as="h4" lineHeight="tight">
          {movie.original_title}
        </Box>

        <Box color="#FAFAFA" fontSize="sm">
          Release date: {movie.release_date}
        </Box>

        <Box color="#FAFAFA" fontSize="sm">
          Popularity: {movie.popularity}
        </Box>

        <Box color="#FAFAFA" fontSize="sm">
          Vote Average: {movie.vote_average}
        </Box>

        <Box
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          color="gray.600"
          // textTransform="uppercase"
          mt={3}
        >
          <Popover placement='top-start'>
            <PopoverTrigger>
              <Button align="center" rounded="full" fontSize="xs" px="4">OVERVIEW</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight='semibold'>Movie Title: {movie.original_title}</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Overview: {movie.overview}
              </PopoverBody>
            </PopoverContent>
          </Popover>{""}
          &bull;{""}
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
    </Box>
  );
};

export default MovieCard;