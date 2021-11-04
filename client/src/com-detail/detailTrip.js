import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Container, Image, Button, Form } from "react-bootstrap";
import "./detail.css";
import iconHotel from "../src-assets/hotel.png";
import iconAirplan from "../src-assets/airplan.png";
import iconMeal from "../src-assets/meal.png";
import iconDuration from "../src-assets/duration.png";
import iconDate from "../src-assets/date.png";
import imageHead from "../src-assets/d11.png";
import image1 from "../src-assets/d112.png";
import image2 from "../src-assets/d113.png";
import image3 from "../src-assets/d114.png";

import { useQuery, useMutation } from "react-query";

import { API } from "../config/api";

function Descriptions() {
  let history = useHistory();
  let { id } = useParams();
  let api = API();

  // Fetching product data from database
  let { data: trip, refetch } = useQuery("Cache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/trip/" + id, config);
    return response.data;
  });

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count <= 1 ? count : count - 1);
  };

  const totalCount = 12000000 * count;
  let prices = totalCount.toString().split("").reverse().join(""),
    totalPrice = prices.match(/\d{1,3}/g);
  totalPrice = totalPrice.join(".").split("").reverse().join("");

  return (
    <>
      <Container>
        <h1 className="mt-5">
          <b>{trip?.title}</b>
        </h1>
        <h5 className="mb-3 mt-2">{trip?.country.name}</h5>
      </Container>
      <Container>
        <Image src={imageHead} className="image-head" />
        <div className="d-flex justify-content-between mt-4 mb-10">
          <Image src={image1} />
          <Image src={image2} />
          <Image src={image3} />
        </div>
      </Container>
      <Container>
        <h4 className="mt-5 mb-4">
          <b>Information Trip</b>
        </h4>
        <div className="info-trip mt-4">
          <div className="info-item">
            <h6>Accommodation</h6>
            <div className="item-2">
              <img className="icon-info" src={iconHotel} alt="img" />
              <h5 className="title-info">
                <b>{trip?.accomodation}</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Transportation</h6>
            <div className="item-2">
              <img className="icon-info" src={iconAirplan} alt="img" />
              <h5 className="title-info">
                <b>{trip?.transportation}</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Eat</h6>
            <div className="item-2">
              <img className="icon-info" src={iconMeal} alt="img" />
              <h5 className="title-info">
                <b>{trip?.eat}</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Duration</h6>
            <div className="item-2">
              <img className="icon-info" src={iconDuration} alt="img" />
              <h5 className="title-info">
                <b>{trip?.day}</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Date Trip</h6>
            <div className="item-2">
              <img className="icon-info" src={iconDate} alt="img" />
              <h5 className="title-info">
                <b>{trip?.dateTrip}</b>
              </h5>
            </div>
          </div>
        </div>
        <h5 className="mt-5 mb-3">
          <b>Description</b>
        </h5>
        <p className="mb-5">{trip?.description}</p>
      </Container>
      <Container className="mb-20">
        <div className="price-1 mt-2">
          <h3>
            <b>IDR. {trip?.price} / Person</b>
          </h3>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="warning" onClick={decrement}>
            <b> - </b>
          </Button>
          <Form.Control className="qty" type="text" value={count} readOnly />
          <Button variant="warning" onClick={increment}>
            <b>+</b>
          </Button>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <h3>
            <b>Total :</b>
          </h3>
          <h3>
            <b className="text-danger">IDR. {totalPrice}</b>
          </h3>
        </div>
        <hr />
        <div className="d-flex justify-content-end mt-4">
          <Button variant="warning">
            <b>BOOK NOW</b>
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Descriptions;
