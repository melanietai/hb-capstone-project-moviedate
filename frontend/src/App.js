import { React, Fragment } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import Events from './pages/Events';
import ShowEvent from './pages/ShowEvent';
import useToken from './components/useToken';
import AppBar from './components/AppBar';


const App = () => {
  const { token, removeToken, setToken } = useToken();

  const onLogoutClick = (evt) => {
    evt.preventDefault();
    removeToken();
  };

  let children;
  if (!token && token !== "" && token !== undefined) {
    console.log('render login');
    children = (
      <Routes>
        <Route exact path="/" element={<Home setToken={setToken} />} />
        <Route path="/events/:eventKey" element={<ShowEvent />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
    );
  } else {
    console.log('render routes');
    children = (
      <Fragment>
        <AppBar onLogoutClick={onLogoutClick} />
        <div className="App-menu">
          <Routes>
            <Route exact path="/" element={<CreateEvent />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/events/:eventKey" element={<ShowEvent />} />
          </Routes>
        </div>
      </Fragment>
    );
  }


  return (
    <BrowserRouter>
      <div className="App">
        {children}
      </div>
    </BrowserRouter>

  );
};

export default App;