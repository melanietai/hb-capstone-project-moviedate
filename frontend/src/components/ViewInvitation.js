import React from 'react';

const ViewInvitation = () => {
  return (
    <div className="view-invitation-wrapper">
      <hi>View event by invitation</hi>
      <form>
        <label>
          <p>Email</p>
          <input type="email" name="email" required />
        </label>
        <label>
          <p>Access Key</p>
          <input type="text" name="key" required />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ViewInvitation;










  <h2>View Event by Invitation</h2>
  <form action='/invitation' method='POST'>
    <p>
      Email <input type='email' name='email' required>
    </p>

    <p>
      key <input type='text' name='key' required>
    </p>

    <p>
      <input type='submit'>
    </p>
  </form>