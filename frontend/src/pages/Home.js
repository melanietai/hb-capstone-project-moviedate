import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import MovieScrollBar from '../components/MovieScrollBar';
import Footer from '../components/Footer';
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
          <Flex w="100%" align="center" justify="center" flexDirection={{
            sm: "column",
            md: "column",
            lg: "row"
          }}>
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
                        <Box ml={1}>Let's participate together to close the gap of social distancing.</Box>
                        <Heading as="h4" fontSize="lg" color="#161231" pt={6}>
                          <Box m="8" fontWeight="medium">
                          Connect with your friends and families at the comfort of your own home.
                          </Box>
                          <Box m="8" fontWeight="medium">
                          You'll be able to host or join virtual movie dates.
                          </Box>
                          <Box m="8" fontWeight="medium">
                          You can search for movies, create events, invite your 
                          friends and families, view events, vote for movies, and many more!
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
      <Footer />
    </>
  )
};

export default Home;