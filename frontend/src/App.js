import { React, Fragment } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import Events from './pages/Events';
import ShowEvent from './pages/ShowEvent';
import useToken from './components/useToken';
import AppBar from './components/AppBar';


const App = () => {
  const { token, removeToken, setToken } = useToken();


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
        <AppBar removeToken={removeToken} />
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
      <div className="Footer">
        <a href="http://localhost:5000/about">About this page</a>
      </div>
    </BrowserRouter>

  );
};


// Add a Footer to attribute tmdb source
export default App;