import { Link, useNavigate } from 'react-router-dom';
import { 
  Flex,
  Text
} from "@chakra-ui/react";


const AppBar = (props) => {
  const navigate = useNavigate();

  const onLogoutClick = (evt) => {
    evt.preventDefault();
    props.removeToken();
    navigate("/");
  };
  return (
    <>
      <Flex as="header" 
        position="fixed"
        px="6"
        py="5"
        backgroundColor="#16123F"
        w="100%"
        justify="space-between"
        color="#FAFAFA"
      >
      <Text pl={2} color="#FFE26A" fontWeight="bold">THE MOVIE DATE</Text>
      <Link to="/">Create Event</Link>
      <Link to="/events">View Events</Link>
      <Link to="#" onClick={onLogoutClick}>Logout</Link>
      </Flex>
      
    </>
  );
};


export default AppBar;
