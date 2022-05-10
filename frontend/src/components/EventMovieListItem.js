import { 
  ListItem,
  Flex,
  Box,
  Spacer,
  Button
} from "@chakra-ui/react";


const EventMovieListItem = (props) => {
  const movie = props.movie;
  const removeMovieButtonClick = props.removeMovieButtonClick;

  const onClick = (evt) => {
    evt.preventDefault();
    removeMovieButtonClick(movie);
  }
  
  return (
    <Flex>
      <Box m={2} fontSize="sm">
          <ListItem align="left">{movie.title}</ListItem>
      </Box>
      <Spacer />
      <Box m={0}>
        <Button type="button" fontSize="xs" color="#90909A" onClick={onClick}>Remove</Button>
      </Box>
    </Flex>
  )
};


export default EventMovieListItem;