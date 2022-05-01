
const { Fragment } = React;
const { Redirect, Link, Route, Switch, BrowserRouter: Router } = ReactRouterDOM;

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
      <Switch>
        <Route exact path="/" render={() => <Index setToken={setToken} />}></Route>
        <Route path="/events/:eventKey" component={ShowEvent}></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    console.log('render routes');
    children = (
      <Fragment>
        <NavigationBar onLogoutClick={onLogoutClick} />
        <div className="App-menu">
          <Switch>
            <Route exact path="/" component={CreateEvent}></Route>
            <Route exact path="/events" component={Events}></Route>
            <Route exact path="/events/:eventKey" component={ShowEvent}></Route>
            <Route exact path="/page3" component={Index}></Route>
          </Switch>
        </div>
      </Fragment>
    );
  }


  return (
    <Router>
      <div className="App">
        {children}
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));