const { Nav, Navbar, Container } = ReactBootstrap;

const NavigationBar = (props) => {

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Movie Date</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as="span"><Link to="/" style={{ textDecoration: 'none', color: '#FFF'}}>Create event</Link></Nav.Link>
            <Nav.Link as="span"><Link to="/events" style={{ textDecoration: 'none', color: '#FFF'}}>Events</Link></Nav.Link>
            <Nav.Link to="#" onClick={props.onLogoutClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};