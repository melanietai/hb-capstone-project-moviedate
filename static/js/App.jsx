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
    children = (<Index setToken={setToken} />)
  } else {
    console.log('render routes');
    children = (
      <div className="App-menu">
        <ol>
          <li><Link to="/">Create event</Link></li>
          <li><Link to="/page1">Events</Link></li>
          <li><Link to="/page2">Event Details</Link></li>
        </ol>
        <Switch>
            <Route exact path="/" component={CreateEvent}></Route>
            <Route exact path="/page1" component={Events}></Route>
            {/* <Route exact path="/page2" component={EventDetails}></Route> */}
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