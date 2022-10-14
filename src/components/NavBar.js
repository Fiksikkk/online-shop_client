import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar";
import { Button, Container, Nav } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token')
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={SHOP_ROUTE}>The online shop</Navbar.Brand>
        {user.isAuth && user.isAdmin ? (
          <Nav className="ms-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin Panel
            </Button>
            <Button
              className="ms-2"
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Log Out
            </Button>
          </Nav>
        ) : user.isAuth ? (
          <Nav className="ms-auto">
            <Button
              className="ms-2"
              variant={"outline-light"}
              onClick={() => logOut()}
            >
              Log Out
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Log In
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
