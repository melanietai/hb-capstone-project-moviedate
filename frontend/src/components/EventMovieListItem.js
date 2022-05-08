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
      <Box m={3}>
          <ListItem align="left">{movie.title}</ListItem>
      </Box>
      <Spacer />
      <Box m={3}>
        <Button type="button" color="#90909A" onClick={onClick}>Remove Me</Button>
      </Box>
    </Flex>
  )
};


export default EventMovieListItem;