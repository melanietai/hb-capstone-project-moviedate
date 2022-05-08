import React, { useState, useEffect, Fragment } from 'react';
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
  Container
} from "@chakra-ui/react";


const ShowMovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const movie = props.movie;
  const voteCount = movie.vote_count;
  const apiId = movie.api_id;

  useEffect(() => {
    if (apiId) {
      fetch(`/movie/${apiId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movie => {
        setMovieDetails(movie);
      });
    }
  }, [apiId]);



  return(
    <Box>
      <Container bg="#16123F">
        <Image
         src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
         alt="movei poster"
         pt={4}
        />
        <Box color="#FFE26A" p={3}>
          <Box fontWeight="semibold" fontSize="lg" as="h4" lineHeight="tight" >
            {movieDetails.original_title}
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Release date:</Text>
            <Text>{movieDetails.release_date}</Text>
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Popularity: {movieDetails.popularity}</Text>
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Vote Average: {movieDetails.vote_average}</Text>
          </Box>

          <Box color="#75C9B7" fontSize="sm">
            <Text>Current Vote Count: {voteCount}</Text>
          </Box>

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
                <PopoverHeader fontWeight='semibold'>Movie Title: {movieDetails.original_title}          </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Overview: {movieDetails.overview}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


export default ShowMovieDetails;