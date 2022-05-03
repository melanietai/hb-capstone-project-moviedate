import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';


const Home = (props) => {
  const [active, setActive] = useState("login");
  
  const switchToLogin = () => {
    setActive("login");
  };

  const switchToSignup = () => {
    setActive("signup");
  };

  let children;
  if (active == "login") {
    children = (<Login setToken={props.setToken} switchToSignup={switchToSignup}/>)
  } else {
    children = (<Signup setToken={props.setToken} switchToLogin={switchToLogin}/>)
  }


  return (
    <div>
      {children}
    </div>
  )
};

export default Home;