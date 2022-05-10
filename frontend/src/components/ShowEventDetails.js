import {
  Box,
  Heading
} from "@chakra-ui/react";


const ShowEventDetails = (props) => {
  const event = props.event;


  return(
    <Box>
      <Heading size="lg" fontWeight="bold" align="center">Welcome to the Event - {event.title}!</Heading>
      <Heading size="lg" fontWeight="bold" align="center">This movie date will be held on {event.event_at}</Heading>
    </Box>
  );
};


export default ShowEventDetails;