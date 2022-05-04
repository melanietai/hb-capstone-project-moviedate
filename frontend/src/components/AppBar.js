import { Link, useNavigate } from 'react-router-dom';

const AppBar = (props) => {
  const navigate = useNavigate();

  const onLogoutClick = (evt) => {
    evt.preventDefault();
    props.removeToken();
    navigate("/");
  };
  return (
    <div>
      Movie Date
      <Link to="/">Create event</Link>
      <Link to="/events">Events</Link>
      <Link to="#" onClick={onLogoutClick}>Logout</Link>
    </div>
  );
};

export default AppBar;
