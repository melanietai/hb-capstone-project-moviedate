
const { Fragment } = React;
const { Navigate, Link, Route, Routes, BrowserRouter } = ReactRouterDOM;

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
        <Route exact path="/" element={<Index setToken={setToken} />} />
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
        <NavigationBar onLogoutClick={onLogoutClick} />
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

ReactDOM.render(<App />, document.getElementById('root'));