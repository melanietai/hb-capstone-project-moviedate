const App = () => {
  const { token, removeToken, setToken } = useToken();
  const Link = ReactRouterDOM.Link;
  const Route = ReactRouterDOM.Route;
  // const Routes = ReactRouterDOM.Routes;
  const Switch = ReactRouterDOM.Route;
  const Router = ReactRouterDOM.BrowserRouter;

  let children;
  if (!token && token!=="" &&token!== undefined) {
    console.log('render login');
    children = <Login setToken={setToken} />
  } else {
    console.log('render routes');
    children = (
      <div className="App-menu">
        {/* <ol>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/page1">Create Event</Link></li>
          {/* <li><Link to="/page2">Events</Link></li>
          <li><Link to="/page3">Event Details</Link></li> */}
        {/* </ol> */}
        <Switch>
            <Route exact path="/" component={CreateEvent}></Route>
            <Route path="/page1" component={CreateEvent}></Route>
            {/* <Route path="/page2" element={<Event token={token} setToken={setToken}/>}></Route>
            <Route path="/page3" element={<EventDetails token={token} setToken={setToken}/>}></Route> */}
        </Switch>
      </div>
    );
  }


  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Movie Date!</h1>
        {/* <Navbar token={removeToken}/> */}
        {children}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));