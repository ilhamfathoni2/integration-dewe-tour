import React, { useState } from "react";
import { useHistory } from "react-router";

import Button from "@restart/ui/esm/Button";
import { Container } from "react-bootstrap";
import "./trip.css";

import { useMutation, useQuery } from "react-query";

import { API } from "../config/api";

function Addnewtrip() {
  const title = "Add Trip";
  document.title = "Dewe Tour | " + title;

  let history = useHistory();
  let api = API();

  const [preview, setPreview] = useState();

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    title: "",
    countryId: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    quotaMinus: "",
    description: "",
    image: "",
  });

  // Fetching category data
  const { data: country } = useQuery("countryCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/country", config);

    return response.data;
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("countryId", form.countryId);
      formData.set("accomodation", form.accomodation);
      formData.set("transportation", form.transportation);
      formData.set("eat", form.eat);
      formData.set("day", form.day);
      formData.set("night", form.night);
      formData.set("dateTrip", form.dateTrip);
      formData.set("price", form.price);
      formData.set("quota", form.quota);
      formData.set("quotaMinus", form.quotaMinus);
      formData.set("description", form.description);

      for (let i = 0; i < form.image.length; i++) {
        formData.append("image", form.image[i]);
      }

      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      };

      const response = await api.post("/trip", config);
      console.log(response);
      history.push("/incom-trip");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container>
      <div className="mt-5">
        <h1>
          <b>Add Trip</b>
        </h1>
        <div className="mt-4"></div>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mb-3">
            <label className="form-label">
              <b>Title Trip</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Country</b>
            </label>
            <select
              className="form-select"
              name="countryId"
              onChange={handleChange}
            >
              <option>Chose</option>
              {country?.map((item, index) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Accommodation</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="accomodation"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Transportation</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="transportation"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Eat</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="eat"
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">
              <b>Duration</b>
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="input-2"
              name="day"
              onChange={handleChange}
            />
            <label className="form-label mar-5">
              <b>Day</b>
            </label>
            <input
              type="text"
              className="input-2"
              name="night"
              onChange={handleChange}
            />
            <label className="form-label">
              <b>Night</b>
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Date Trip</b>
            </label>
            <input
              type="date"
              className="form-control"
              name="dateTrip"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Price</b>
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Quota</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="quota"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Remaining Quota</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="quotaMinus"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Description</b>
            </label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Image</b>
            </label>
            <input
              type="file"
              className="form-control"
              name="image"
              multiple
              onChange={handleChange}
            />
          </div>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
          <Button type="submit" className="btn btn-warning mt-5 mb-10 add-trip">
            <b>Add New Trip</b>
          </Button>
        </form>
      </div>
      <div className="mb-10"></div>
    </Container>
  );
}

export default Addnewtrip;
