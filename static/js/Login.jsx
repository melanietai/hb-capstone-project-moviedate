const Login = (props) => {

  const[login, setLogin] = React.useState({
    email: '',
    password: ''
  });

  const logIn = (evt) => {
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
    })
// reset login
    setLogin({
      email: '',
      passwprd: ''
    })

  // create a new dictionary
  const handleChange = (evt) => {
    const { value, name} = evt.target.value;
    setLogin(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  };
  
  }


  return (
    <div className="login-wrapper">
    <h1>Login</h1>
    <form className="login">
      <input onChange={handleChange}
        type="email"
        name="email"
        placeholder="Email"
        value={login.email}
        required />
      <input onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
        value={login.password}
        required />

      <button onClick={logIn}>Submit</button>
    </form>
  </div>
  )
};