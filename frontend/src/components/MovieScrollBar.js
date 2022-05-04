import MovieCards from "./MovieCards";
import useToken from './useToken';
import SearchMovies from "./SearchMovies";
import { 
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

const MovieScrollBar = (props) => {
  const popularMovies = props.popularMovies;
  const topRatedMovies = props.topRatedMovies;
  const { token } = useToken();
  
  return(
    <>
      <Box>
        <Container>
          <Box p={3}>
            <Tabs>
              <TabList>
                <Tab>Popular Movies</Tab>
                <Tab>Top Rated Movies</Tab>
                <Tab>Search by Keyword</Tab>
              </TabList>

              <TabPanels overflowY="scroll" maxHeight="90vh">
                <TabPanel>
                  <MovieCards movies={popularMovies}/>
                </TabPanel>
                <TabPanel>
                  <MovieCards movies={topRatedMovies}/>
                </TabPanel>

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

        