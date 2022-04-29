const App = () => {
  const { token, removeToken, setToken } = useToken();
  const Link = ReactRouterDOM.Link;
  const Route = ReactRouterDOM.Route;
  const Routes = ReactRouterDom.Routes;
  const BrowserRouter = ReactRouterDom.BroswerRouter;

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome to the Movie Date!</h1>
        {/* <Nav token={removeToken}/> */}
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          <div className="App-menu">
            <ol>
              <li><Link to="/">Create Event</Link></li>
              <li><Link to="/page1">Events</Link></li>
              <li><Link to="/page2">Event Details</Link></li>
            </ol>
            <Routes>
                <Route exact path="/" element={<CreateEvent token={token} setToken={setToken}/>}></Route>
                <Route path="/page1" element={<Event token={token} setToken={setToken}/>}></Route>
                <Route path="/page2" element={<EventDetails token={token} setToken={setToken}/>}></Route>
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));