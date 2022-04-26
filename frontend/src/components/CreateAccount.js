import React from 'react';

const CreateAccount = () => {
  return (
    <div className="create-account-wrapper">
      <hi>Create an account</hi>
      <form>
        <label>
          <p>First name</p>
          <input type="text" name="fname" required />
        </label>
        <label>
          <p>Last name</p>
          <input type="text" name="lname" required />
        </label>
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

export default CreateAccount;