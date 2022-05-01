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
    children = (
        <Switch>
            <Route exact path="/" element={<Index setToken={setToken} />}></Route>
            <Route path="/events/:eventKey" component={ShowEvent}></Route>
        </Switch>
    );
  } else {
    console.log('render routes');
    children = (
      <div className="App-menu">
        <ol>
          <li><Link to="/">Create event</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/page3">Logout</Link></li>
        </ol>
        <Switch>
            <Route exact path="/" component={CreateEvent}></Route>
            <Route exact path="/events" component={Events}></Route>
            <Route exact path="/events/:eventKey" component={ShowEvent}></Route>
            <Route exact path="/page3" component={Index}></Route>
        </Switch>
      </div>
    );
  }


  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Movie Date!</h1>
        <Logout token={removeToken}/>
        {children}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));