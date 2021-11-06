import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Container, Image, Button, Form } from "react-bootstrap";
import "./detail.css";
import iconHotel from "../src-assets/hotel.png";
import iconAirplan from "../src-assets/airplan.png";
import iconMeal from "../src-assets/meal.png";
import iconDuration from "../src-assets/duration.png";
import iconDate from "../src-assets/date.png";

import convertRupiah from "rupiah-format";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

function Descriptions() {
  let { id } = useParams();
  let api = API();

  const { data: trip } = useQuery("deatilCache", async () => {
    const config = {
      method: "GET",
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
      {trip?.map((item, index) => (
        <Container>
          <h1 className="mt-5">
            <b>{item.title}</b>
          </h1>
          <h5 className="mb-3 mt-2">{item.country.name}</h5>
          <Image src={item.image[0].url} className="image-head" />
          <div className="d-flex justify-content-between mt-4 mb-10">
            <Image src={item.image[1].url} />
            <Image src={item.image[2].url} />
            <Image src={item.image[3].url} />
          </div>
          <h4 className="mt-5 mb-4">
            <b>Information Trip</b>
          </h4>
          <div className="info-trip mt-4">
            <div className="info-item">
              <h6>Accommodation</h6>
              <div className="item-2">
                <img className="icon-info" src={iconHotel} alt="img" />
                <h5 className="title-info">
                  <b>{item.accomodation}</b>
                </h5>
              </div>
            </div>
            <div className="info-item">
              <h6>Transportation</h6>
              <div className="item-2">
                <img className="icon-info" src={iconAirplan} alt="img" />
                <h5 className="title-info">
                  <b>{item.transportation}</b>
                </h5>
              </div>
            </div>
            <div className="info-item">
              <h6>Eat</h6>
              <div className="item-2">
                <img className="icon-info" src={iconMeal} alt="img" />
                <h5 className="title-info">
                  <b>{item.eat}</b>
                </h5>
              </div>
            </div>
            <div className="info-item">
              <h6>Duration</h6>
              <div className="item-2">
                <img className="icon-info" src={iconDuration} alt="img" />
                <h5 className="title-info">
                  <b>{item.day}</b>
                </h5>
              </div>
            </div>
            <div className="info-item">
              <h6>Date Trip</h6>
              <div className="item-2">
                <img className="icon-info" src={iconDate} alt="img" />
                <h5 className="title-info">
                  <b>{item.dateTrip}</b>
                </h5>
              </div>
            </div>
          </div>
          <h5 className="mt-5 mb-3">
            <b>Description</b>
          </h5>
          <p className="mb-5">{item.description}</p>
          <div className="mb-20">
            <div className="price-1 mt-2">
              <h3>
                <b>{convertRupiah.convert(item.price)} / Person</b>
              </h3>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="warning" onClick={decrement}>
                <b> - </b>
              </Button>
              <Form.Control
                className="qty"
                type="text"
                value={count}
                readOnly
              />
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
                <b className="text-danger">Rp. {totalPrice}</b>
              </h3>
            </div>
            <hr />
            <div className="d-flex justify-content-end mt-4">
              <Button variant="warning">
                <b>BOOK NOW</b>
              </Button>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
}

export default Descriptions;
