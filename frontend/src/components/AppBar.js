import { Link } from 'react-router-dom';

const AppBar = (props) => {

  return (
    <div>
      Movie Date
      <Link to="/">Create event</Link>
      <Link to="/events">Events</Link>
      <Link to="#" onClick={props.onLogoutClick}>Logout</Link>
    </div>
  );
};

export default AppBar;
