import React from "react";
import { Nav, Navbar ,Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
        <LinkContainer to='/'>
        <Navbar.Brand  >Online Shoping</Navbar.Brand>
        </LinkContainer>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/cart' >
            <Nav.Link  > <i className="fas fa-shopping-cart"></i>&nbsp; Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer  to='/signin'>
            <Nav.Link  ><i className="fas fa-user"></i>&nbsp; Sign In</Nav.Link>
            </LinkContainer>
            
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
