import { Link } from 'react-router-dom';
import { 
  Box,
  Text
} from "@chakra-ui/react";


const EventsListItemDetails = (props) => {
  const event = props.event;

  return(
    <>
      <Text mt={3}fontWeight="bold" fontSize="lg">Event name: </Text>
      <Box color="#75C9B7">
        <Link to={`/events/${event.key}`} style={{ textDecoration: 'none' }}>{event.title}<br></br><span style={{fontSize: '70%'}}>(Click to view event)</span></Link>
      </Box>
      <Text fontWeight="bold" fontSize="lg">Event date and time: </Text>
      <Box color="#75C9B7">
        {event.event_at}
      </Box>
    </>
  );
};


export default EventsListItemDetails;