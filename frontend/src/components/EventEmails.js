import { 
  Stack,
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";


const EventEmails = (props) => {

  const emails = props.emails;

  const emailsComponents = [];
  for (let i = 0; i < emails.length; i++) {
    const onChange = (evt) => {
      evt.preventDefault();
      props.onEmailChange(evt.target.value, i);
    }
    emailsComponents.push(
      <Box><Input
        key={i}
        onChange={onChange}
        type="email"
        placeholder="Type email..."
        value={emails[i]}
      /><br></br></Box>
    )
  }

  return (
    <>
      <Stack ml={4} maxW="300px">
        <Box>
          <Text>Invite friend(s): </Text>
          {emailsComponents}
        </Box>
        <Button type="button" color="#90909A" onClick={props.onAddEmailButtonClick}>Add another email</Button>
    </Stack>
    </>
  )
};


export default EventEmails;