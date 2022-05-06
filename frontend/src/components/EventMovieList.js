import EventMovieListItem from './EventMovieListItem';
import { 
  OrderedList
} from "@chakra-ui/react";


const EventMovieList = (props) => {
  const eventMovieList = props.eventMovieList;
  const removeMovieButtonClick = props.removeMovieButtonClick;

  return (
    <>
      <OrderedList align="center">
        {eventMovieList.map(movie => <EventMovieListItem key={movie.id} movie={movie} removeMovieButtonClick={removeMovieButtonClick} />)}
      </OrderedList>
    </>
  )
};

export default EventMovieList;