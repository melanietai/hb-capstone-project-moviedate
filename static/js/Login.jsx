const Login = (props) => {

  const[login, setLogin] = React.useState({
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
    }).then(res => res.json()).then(data => {
      props.setToken(data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
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
      <div className="login-wrapper">
        <h2>Please login to continue.</h2>
        <form className="login">
          <input onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            />
          <input onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            />
          {/* <a href="#">Forget your password</a> */}
          <button onClick={onLoginButtonClick}>Login</button>
          Don't have an account?<a href="#" onClick={switchToSignup}>Signup</a>
        </form>
      </div>
  )
};