// import { useContext } from "react";
import { Container, Navbar, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../src-assets/Icon.png";
import AfterLogin from "./afterLogin";
import "./bassic.css";
import Login from "./login";
import Register from "./register";

// import { UserContext } from "../context/authContext";

function NavMain() {
  let users = JSON.parse(localStorage.getItem("user"));

  // const [state] = useContext(UserContext);

  if (!users) {
    return (
      <>
        <div className="bg-hero-nav"></div>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <Image src={Logo} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Row>
                <Col>
                  <Login />
                </Col>
                <Col>
                  <Register />
                </Col>
              </Row>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-hero-nav"></div>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <Image src={Logo} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Row>
                <Col>
                  <AfterLogin />
                </Col>
              </Row>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavMain;
