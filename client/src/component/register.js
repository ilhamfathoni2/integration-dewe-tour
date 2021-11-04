import React, { useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import imgL1 from "../src-assets/palm.png";
import imgl2 from "../src-assets/hibiscus.png";
import "./bassic.css";

function Register() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="mt-3" variant="warning" onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="bg-flex-login">
          <Image className="bg-login" src={imgL1} />
          <Image className="bg-login2" src={imgl2} />
        </div>
        <h3 className="text-center">
          <b>Register</b>
        </h3>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <div className="d-grid gap-2 mt-5">
              <Button variant="warning" size="lg">
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
