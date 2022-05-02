const Index = (props) => {
  const [active, setActive] = React.useState("login");
  
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

{/* <div>
{active === "login" && 
<div>
  <p>Welcome</p>
  <p>Please login to continue</p>
</div>}
{active === "signup" && 
<div>
  <p>Create Account</p>
  <p>Please signup to continue</p>
</div>}
<div>
  {active === "login" && <Login switchToSignup={switchToSignup}/>}
  {active === "signup" && <Signup switchToLogin={switchToLogin}/>}
</div>
</div> */}