import React, { useState } from "react";
import { Button, Modal, Image, Form } from "react-bootstrap";
import "./bassic.css";
import imgL1 from "../src-assets/palm.png";
import imgl2 from "../src-assets/hibiscus.png";

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-warning mr-3 mt-3" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="bg-flex-login">
          <Image className="bg-login" src={imgL1} />
          <Image className="bg-login2" src={imgl2} />
        </div>
        <h3 className="text-center">
          <b>Login</b>
        </h3>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <div className="d-grid gap-2 mt-5">
              <Button variant="warning" size="lg">
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
