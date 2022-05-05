import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import MovieScrollBar from '../components/MovieScrollBar';

import { 
  Container,
  Box,
  Heading,
  Flex,
  Spacer
} from "@chakra-ui/react";

const Home = (props) => {
  const [active, setActive] = useState("login");
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  
  const switchToLogin = () => {
    setActive("login");
  };

  const switchToSignup = () => {
    setActive("signup");
  };

  useEffect(() => {
    console.log('fetch');
    fetch(`/api/popular-movies`)
    .then(res => res.json())
    .then(data => {
      setPopularMovies(data);
    });
  }, []);

  useEffect(() => {
    fetch(`/api/top-rated-movies`)
    .then(res => res.json())
    .then(data => {
      setTopRatedMovies(data);
    });
  }, []);

  let children;
  if (active == "login") {
    children = (<Login setToken={props.setToken} switchToSignup={switchToSignup}/>)
  } else {
    children = (<Signup setToken={props.setToken} switchToLogin={switchToLogin}/>)
  }
  




  return (
    <>
      <Flex w="100%" align="center" justify="center">
        <Box flexDirection="column">
          <Box pl={16}>
            {children}
          </Box>
          <Box pl={16}>
            <Container maxWidth="container.xl">
              <Flex maxWidth="max-content" alignItems='center'>
                <Box d="flex" align-items="center" py="20" flexDirection="row">
                  <Box mx="6">
                    <Heading as="h1" size="lg" color="blue">
                      <Box fontWeight="black">
                        Welcome to The Movie Date!
                      </Box>
                    </Heading>
                    <Heading as="h4" fontSize="lg" color="grey">
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
              </Flex>
            </Container>
          </Box>
        </Box>
        <Spacer />
        <MovieScrollBar eventMovieList={[]} />
      </Flex>

    </>
  )
};

export default Home;