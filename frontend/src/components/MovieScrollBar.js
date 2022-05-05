import React, { useState} from 'react';
import MovieCards from "./MovieCards";
import useToken from './useToken';
import SearchMovies from "./SearchMovies";
import { SearchIcon } from '@chakra-ui/icons'
import { 
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  Input,
  Icon,
  Flex,
  Button
} from "@chakra-ui/react";
import TopRatedMovieCards from './TopRatedMovieCards';
import PopularMovieCards from './PopularMovieCards';
import SearchMovieCards from './SearchMovieCards';

const MovieScrollBar = ({ eventMovieList, addMovieButtonClick }) => {
  const { token } = useToken();
  const movieIds = eventMovieList.map(elem => elem.id);

  return(
    <>
      <Box>
        <Container>
          <Box p={3}>
            <Tabs>
              <TabList>
                <Tab>Popular Movies</Tab>
                <Tab>Top Rated Movies</Tab>
                {token ? (
                  <Tab>
                    Search by Keyword
                  </Tab>
                ) : null}
              </TabList>

              <TabPanels overflowY="scroll" maxHeight="90vh">
                <TabPanel>
                  <PopularMovieCards addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
                </TabPanel>
                <TabPanel>
                  <TopRatedMovieCards addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
                </TabPanel>
                {token ? (
                  <TabPanel>
                    <SearchMovieCards token={token} addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
                  </TabPanel>
                ) : (
                  null
                )}
                <TabPanel>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MovieScrollBar;

        