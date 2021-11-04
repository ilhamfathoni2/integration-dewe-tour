import { Container, Navbar, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../src-assets/Icon.png";
import AfterLogin from "./afterLogin";
import "./bassic.css";
import Login from "./login";
import Register from "./register";

function NavMain() {
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
}

export default NavMain;
