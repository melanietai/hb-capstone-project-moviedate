import React, { useState} from 'react';
import useToken from './useToken';
import TopRatedMovieCards from './TopRatedMovieCards';
import PopularMovieCards from './PopularMovieCards';
import SearchMovieCards from './SearchMovieCards';
import { 
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer
} from "@chakra-ui/react";


const MovieScrollBar = ({ eventMovieList, addMovieButtonClick }) => {
  const { token } = useToken();
  const movieIds = eventMovieList.map(elem => elem.id);

  return(
    <>
      <Box>
        <Container>
          <Box p={3}>
            <Tabs color="#16123F">
              <TabList>
                {token ? (
                  <Tab>
                    Search by Keyword
                  </Tab>
                ) : null}
                <Tab>Popular Movies</Tab>
                <Tab>Top Rated Movies</Tab>
              </TabList>

              <TabPanels position="right" overflowY="scroll" maxHeight="76vh">
                {token ? (
                  <TabPanel>
                    <SearchMovieCards token={token} addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
                  </TabPanel>
                ) : (
                  null
                )}
                <TabPanel>
                  <PopularMovieCards addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
                </TabPanel>
                <TabPanel>
                  <TopRatedMovieCards addedMovieIds={movieIds} addMovieButtonClick={addMovieButtonClick} />
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

        