import React from 'react';

const InvitationLogin = () => {

  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (email, key) {
      fetch('/api/invitation-login', {
        method: 'POST',
        body: JSON.stringify({ email: email, key: key }),
        headers: { 'Content-Type': 'application/json',
      },
      }).then (res => res.json()).then(data => {

      })
    }
  }, [email, key])

 const onSubmit = (evt) => {
    evt.preventDefault();
    setEmail(evt.target.email.value);
    setKey(evt.target.key.value);
  }



  return (
    <div className="invitation-login-wrapper">
      <hi>View event by invitation</hi>
      <form onSubmit={onSubmit}>
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

export default InvitationLogin;










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