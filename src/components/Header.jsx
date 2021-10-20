import React from "react";
import { Nav, Navbar ,Container, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userAction";
const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo}= userLogin;
  const dispatch = useDispatch()

  const logoutHandler=()=>{
    dispatch(logout())
  }

 
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
            {userInfo ? (
              <NavDropdown title={userInfo.name }  id="userName"> 
              
              <LinkContainer to='/profile' >
                <NavDropdown.Item >
                    Profile
                </NavDropdown.Item>
              </LinkContainer>

                <NavDropdown.Item  onClick={logoutHandler}>
                    Log Out
                </NavDropdown.Item>
              
              </NavDropdown>
            ) :(
              <LinkContainer  to='/login'>
              <Nav.Link  ><i className="fas fa-user"></i>&nbsp; Sign In</Nav.Link>
              </LinkContainer>
            )}
          
            
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
