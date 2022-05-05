import React, { useState } from 'react';
import { 
  HStack,
  Box,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Flex,
  Text,
  Spacer
} from "@chakra-ui/react";

const Login = (props) => {

  const[login, setLogin] = useState({
    email: '',
    password: ''
  });

  const switchToSignup = props.switchToSignup;

  const onLoginButtonClick = (evt) => {
    evt.preventDefault();
    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({
        email: login.email,
        password: login.password
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
      console.log('login success');
      console.log(data);
      props.setToken(data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    setLogin({
      email: '',
      password: ''
    });
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setLogin(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  };

  return (
    <>
    <Box maxWidth="container.xl">
      <Box px={10}>Log In: </Box>
      <HStack px={10} spacing='12px'>
        <InputGroup size="md">
          <Input  onChange={handleChange}
            type="email" 
            name="email" 
            value={login.email} 
            placeholder="Enter Email"
          />
        </InputGroup>
        <InputGroup size="md">
          <Input onChange={handleChange}
            type="password"
            name="password"
            value={login.password} 
            placeholder="Enter password"
          />
        </InputGroup>
        <Button onClick={onLoginButtonClick} align="center" px="4" fontSize="xs" >Log in</Button>
      </HStack>
      <Box px={10}>
        <Flex>
          <Spacer />
          <Text as="i" align="center" color="gray.600" fontSize="xs">
            Dont't have an Account?  <a href="#" onClick={switchToSignup} align="center" px="4">Signup</a>
          </Text>
        </Flex>
      </Box>
    </Box>
      
    </>
  )
};

export default Login;