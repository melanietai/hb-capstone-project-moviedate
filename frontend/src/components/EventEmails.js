import { 
  Stack,
  Box,
  Text,
  Input,
  Button,
  Spacer
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
      <Stack pt={6} maxW="300px">
        <Box>
          <Text>Email friend(s) that you would like to invite: </Text>
          {emailsComponents}
        </Box>
        <Button type="button" color="#90909A" onClick={props.onAddEmailButtonClick}>Add another email</Button>
        <Box pt={8}></Box>
    </Stack>
    </>

    
    // <div className="emails-container">
    //   <label>
    //     <p>Email friend(s) that you would like to RSVP</p>
    //     {emailsComponents}
    //   </label>
    //   <button type="button" onClick={props.onAddEmailButtonClick}>Add another email</button>
    // </div>
  )
};

export default EventEmails;