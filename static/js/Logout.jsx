const Logout = (props) => {
  const token = props.token;

  const onLogoutButtonClick = (evt) => {
    evt.preventDefault();
    fetch('/api/logout', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      props.token();
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    });
  };


  return (
      <div className="logout-button">
        <button onClick={onLogoutButtonClick}> 
          Logout
        </button>
      </div>
  );
};