import { 
  Box,
  Image,
  Badge
} from "@chakra-ui/react";

const MovieCards = (props) => {
  const movies = props.movies;
  return(
    <> 
      {movies.map(movie => {
        return(
          <Box mt={3} borderWidth="1px" rounded="lg" overflow="hidden">
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

              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                color="gray.600"
                textTransform="uppercase"
                mt={3}
              >
                <Badge align="center" rounded="full" px="2" variantColor={"green"}>
                  Overview
                </Badge>{" "}
                &bull;{" "}
                <Badge align="center" rounded="full" px="2" variantColor={"green"}>
                  Add movie
                </Badge>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  )
};

export default MovieCards;