import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import MovieScrollBar from '../components/MovieScrollBar';

import { 
  Container,
  Box,
  Heading,
  Flex,
  Spacer,
  Text
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
    fetch(`/popular-movies`)
    .then(res => res.json())
    .then(data => {
      setPopularMovies(data);
    });
  }, []);

  useEffect(() => {
    fetch(`/top-rated-movies`)
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
      <Flex as="header" 
        position="fixed"
        px="6"
        py="1"
        backgroundColor="#16123F"
        w="100%"
        justify="space-between"
        color="#75C9B7"
      >
      <Text pl={2} pt={4} color="#FFE26A" fontWeight="bold">THE MOVIE DATE</Text>
        <Box>
          {children}
        </Box>
      </Flex>
      <Box pt={6}>
        <Container maxWidth="container.xl" mt={20}>
          
          <Flex w="100%" align="center" justify="center">
            <Box flexDirection="column">
              
              <Box pl={16}>
                <Container maxWidth="container.xl">
                  <Flex maxWidth="max-content" alignItems='center'>
                    <Box>
                      <Box>
                        <Heading as="h1" size="xl" color="#16123F">
                          <Box fontWeight="black">
                            Welcome to The Movie Date!
                          </Box>
                        </Heading>
                        <Heading as="h4" fontSize="lg" color="#161231" pt={6}>
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
            <Box>
              <MovieScrollBar eventMovieList={[]} />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
};

export default Home;

<div className="Footer" backgroundColor="#414A5E">

</div>