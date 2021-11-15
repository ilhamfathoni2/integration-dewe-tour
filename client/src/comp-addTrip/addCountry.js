import React, { useState } from "react";

import Button from "@restart/ui/esm/Button";
import { Container, Alert } from "react-bootstrap";
import "./trip.css";

import { useMutation } from "react-query";

import { API } from "../config/api";

function AddCountry() {
  const title = "Add Country";
  document.title = "Dewe Tour | " + title;

  let api = API();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
      };

      const body = JSON.stringify(data);

      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body,
      };

      const res = await api.post("/country", config);
      console.log(res);
      if (res.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success add country
          </Alert>
        );
        setMessage(alert);
      } else if (res.status === "400") {
        const alert = (
          <Alert variant="danger" className="py-1">
            Country already exist
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed add country !
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container>
      <div className="mt-5 mb-3">
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mb-3">
            <label className="form-label">
              <b>Country</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="btn btn-warning mt-3 mb-10 add-trip">
            <b>Add Country</b>
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AddCountry;
