import React, { useState, useContext } from "react";

import { Button, Modal, Form, Image, Alert } from "react-bootstrap";

import imgL1 from "../src-assets/palm.png";
import imgl2 from "../src-assets/hibiscus.png";
import "./bassic.css";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/authContext";

function Register() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [, dispatch] = useContext(UserContext);
  let history = useHistory();

  let api = API();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { fullname, email, password, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(form);

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data user to database
      const response = await api.post("/register", config);

      // Notification
      if (response.status === "success...") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });

        // Status check
        if (response.data.role === "admin") {
          history.push("/incom");
        } else {
          history.push("/");
        }
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Field
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

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
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                name="fullname"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                name="phone"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                name="address"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-5">
              <Button variant="warning" size="lg" type="submit">
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
