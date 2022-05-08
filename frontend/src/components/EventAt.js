import { 
  Stack,
  Box,
  Text,
  Input
} from "@chakra-ui/react";


const EventAt = (props) => {

  return (
    <>
      <Stack maxW="300px">
        <Box>
          <Text>Event name:</Text>
          <Input onChange={props.onTitleChange} type="text" name="title" />
        </Box>
        <Box pt={3}>
          <Text>Select a date:</Text>
          <Input onChange={props.onDateChange} type="date" name="date" />
        </Box>
        <Box pt={3}>
          <Text>Select a time:</Text>
          <Input onChange={props.onTimeChange} type="time" name="time" />
        </Box>
      </Stack>
    </>
  )
};


export default EventAt;

