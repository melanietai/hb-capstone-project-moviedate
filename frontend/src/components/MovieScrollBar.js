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

const MovieScrollBar = (props) => {
  const popularMovies = props.popularMovies;
  const topRatedMovies = props.topRatedMovies;
  const keywordMovies = props.keywordMovies;
  const { token } = useToken();
  const onSubmit = props.onSubmit;
  
  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();
    onSubmit(evt);
  }

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
                ) : (
                  <div></div>
                )}
              </TabList>

              <TabPanels overflowY="scroll" maxHeight="90vh">
                <TabPanel>
                  <MovieCards movies={popularMovies}/>
                </TabPanel>
                <TabPanel>
                  <MovieCards movies={topRatedMovies}/>
                </TabPanel>
                {token ? (
                  <TabPanel>
                    <FormControl htmlFor="keyword" onSubmit={onSubmitButtonClick}>Search</FormControl>
                      <Flex>
                        <Input id="keyword" type="text" placeholder="Keyword" size="sm" />
                        <Button colorScheme='blue' size="sm"><Icon as={SearchIcon} /></Button>
                      </Flex>
                    <FormControl />
                    <MovieCards movies={keywordMovies}/>
                  </TabPanel>
                ) : (
                  <div></div>
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

        