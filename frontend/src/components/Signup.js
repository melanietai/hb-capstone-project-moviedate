import React, { useState } from 'react';


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
    fetch('/api/register-user', {
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
      console.log('signup successful');
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
    <div className="signup-wrapper">
      <h2>Please signup to continue.</h2>
      <form className="signup">
        <input onChange={handleChange}
          type="text"
          name="fname"
          placeholder="First Name"
          value={signup.fname}
          />
        <input onChange={handleChange}
          type="text"
          name="lname"
          placeholder="Last Name"
          value={signup.lname}
          />
        <input onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={signup.email}
          />
        <input onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={signup.password}
          />
        <button onClick={onSignupButtonClick}>Signup</button>
        Already have an account?<a href="#" onClick={switchToLogin}>Login</a>
      </form>
    </div>
  )
};


export default Signup;