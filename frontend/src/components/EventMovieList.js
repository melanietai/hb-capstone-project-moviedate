import EventMovieListItem from './EventMovieListItem';
import { 
  OrderedList,
  ListItem,
  List
} from "@chakra-ui/react";


const EventMovieList = (props) => {
  const eventMovieList = props.eventMovieList;
  const removeMovieButtonClick = props.removeMovieButtonClick;

  return (
    <>
      <List align="center">
        <ListItem>{eventMovieList.map(movie => <EventMovieListItem key={movie.id} movie={movie} removeMovieButtonClick={removeMovieButtonClick} />)}</ListItem>
      </List>
    </>
  )
};

export default EventMovieList;