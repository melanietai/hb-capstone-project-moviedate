import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Box, Container, Image, Stack, Heading, Flex, Spacer } from '@chakra-ui/react';


const Home = (props) => {
  const [active, setActive] = useState("login");
  const [movies, setMovies] = useState([]);
  
  const switchToLogin = () => {
    setActive("login");
  };

  const switchToSignup = () => {
    setActive("signup");
  };

  let children;
  if (active == "login") {
    children = (<Login setToken={props.setToken} switchToSignup={switchToSignup}/>)
  } else {
    children = (<Signup setToken={props.setToken} switchToLogin={switchToLogin}/>)
  }
  

  useEffect(() => {
    fetch(`/api/popularmovies`)
    .then(res => res.json())
    .then(data => {
      setMovies(data);
    });
  }, []);




  return (
    <>
      <Box d="flex" align-items="center">
        {movies.map(movie => {
        return (
          <Stack key={movie.id}>
            <Image
              boxSize='150px'
              objectFit='cover'
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt='popular movie poster'
            />
          </Stack>
        );
        })}
      </Box>
      <Box>
        <Container maxWidth="container.xl">
          <Flex maxWidth='max-content' alignItems='center'>
            <Box d="flex" align-items="center" py="20" flexDirection="row">
              <Box mx="6">
                <Heading as="h1" size="lg" color="yellow">
                  <Box fontWeight="black">
                    Welcome to The Movie Date!
                  </Box>
                </Heading>
                <Heading as="h4" fontSize="lg" color="white">
                  <Box m="8" fontWeight="medium">
                  Want to watch a movie with friends at the convenience inside your home?
                  </Box>
                  <Box m="8" fontWeight="medium">
                  You are at the right place! 
                  </Box>
                  <Box m="8" fontWeight="medium">
                  You'll be able to host or join virtual movie dates.
                  </Box>
                  <Box m="8" fontWeight="medium">
                  You can search for movies, create events, invite your 
                  friends, view events, vote for movies, and many more!
                  </Box>
                </Heading>
              </Box>
            </Box>
            <Spacer />
              {children}
          </Flex>
        </Container>
      </Box>
      <Box d="flex" align-items="center" position="fixed" bottom="0">
        {movies.map(movie => {
        return (
          <Stack key={movie.id}>
            <Image
              boxSize='150px'
              objectFit='cover'
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt='popular movie poster'
            />
          </Stack>
        );
        })}
      </Box>
    </>
  )
};

export default Home;