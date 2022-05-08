import React, { useState } from 'react';
import { 
  HStack,
  Box,
  InputGroup,
  Input,
  Button,
  Flex,
  Text,
  Spacer
} from "@chakra-ui/react";


const Signup = (props) => {
  const[signup, setSignup] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });

  const switchToLogin = props.switchToLogin;

  const onSignupButtonClick = (evt) => {
    evt.preventDefault();
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify({
        fname: signup.fname,
        lname: signup.lname,
        email: signup.email,
        password: signup.password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status != 200) {
        const error = new Error();
        error.response = res;
        throw error;
      }
      return res.json();
    }).then(data => {
      props.setToken(data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    });
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setSignup(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  };

  return (
    <>
    <Box maxWidth="container.xl">
      <HStack spacing='3px'>
        <InputGroup size="md">
          <Input  onChange={handleChange}
            type="text" 
            name="fname" 
            value={signup.fname} 
            placeholder="First name"
            color="#FAFAFA"
          />
        </InputGroup>
        <InputGroup size="md">
          <Input onChange={handleChange}
            type="text"
            name="lname"
            value={signup.lname} 
            placeholder="Last name"
            color="#FAFAFA"
          />
        </InputGroup>
        <InputGroup size="md">
          <Input  onChange={handleChange}
            type="email" 
            name="email" 
            value={signup.email} 
            placeholder="Email"
            color="#FAFAFA"
          />
        </InputGroup>
        <InputGroup size="md">
          <Input onChange={handleChange}
            type="password"
            name="password"
            value={signup.password} 
            placeholder="Password"
            color="#FAFAFA"
          />
        </InputGroup>
        <Button onClick={onSignupButtonClick} align="center" px="4" fontSize="xs" color="#16123F">Sign up</Button>
      </HStack>
      <Box>
        <Flex>
          <Spacer />
          <Text as="i" align="center" color="#FAFAFA" fontSize="xs">
          Already have an account?  <a href="#" onClick={switchToLogin} align="center" px="4">Log in</a>
          </Text>
        </Flex>
      </Box>
    </Box>
      
    </>
  )
};


export default Signup;