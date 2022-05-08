import {
  Box,
  Text
} from "@chakra-ui/react";


const ShowEventDetails = (props) => {
  const event = props.event;


  return(
    <Box>
      <Text fontWeight="bold" align="center">Welcome to the Event - {event.title}!</Text>
      <Text fontWeight="bold" align="center">This movie date will be held on {event.event_at}</Text>
    </Box>
  );
};


export default ShowEventDetails;