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

const MovieCards = (props) => {
  const movies = props.movies;
  const { token } = useToken();


  let popoverBtn;
  if (token) {
    popoverBtn = (
      <Popover placement='top-start'>
        <PopoverTrigger>
          <Button align="center" rounded="full" fontSize="xs" px="4">ADD MOVIE TO EVENT</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Sucessfully Added!</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Movied added to your event's movie list
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )} else {
      popoverBtn = (
        <Popover placement='top-start'>
          <PopoverTrigger>
            <Button align="center" rounded="full" fontSize="xs" px="4">ADD MOVIE TO EVENT</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>Log in required</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Please log in to use this feature
            </PopoverBody>
          </PopoverContent>
        </Popover>
    )}
  return(
    <> 
      {movies.map(movie => {
        return(
          <Box key={movie.id} mt={3} borderWidth="1px" rounded="lg" overflow="hidden">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt='popular movie poster'
            />
            <Box p={3}>
              <Box fontWeight="semibold" fontSize="lg" as="h4" lineHeight="tight">
                {movie.original_title}
              </Box>

              <Box color="gray.600" fontSize="sm">
                Release date: {movie.release_date}
              </Box>

              <Box color="gray.600" fontSize="sm">
                Popularity: {movie.popularity}
              </Box>

              <Box color="gray.600" fontSize="sm">
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
                {popoverBtn}
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  )
};

export default MovieCards;