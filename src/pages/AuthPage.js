import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";

const AuthPage = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authorization = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      if(data.role === "ADMIN") {
        user.setIsAdmin(true)
      }
      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.responce.data.message)
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Sign In" : "Sign Up"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
            <Button variant={"outline-success"} onClick={authorization}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            {isLogin ? (
              <div className="pt-1">
                Don`t have account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Sing Up Here!</NavLink>
              </div>
            ) : (
              <div>
                You already have account?{" "}
                <NavLink to={LOGIN_ROUTE}>Sing In Here!</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default AuthPage;
