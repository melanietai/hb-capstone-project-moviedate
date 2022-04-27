import React from 'react';

const Login = () => {
  return (
    <div className="login-wrapper">
      <hi>Log in</hi>
      <form>
        <label>
          <p>Email</p>
          <input type="email" name="email" required />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" required />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;