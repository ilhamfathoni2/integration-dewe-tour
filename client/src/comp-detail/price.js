import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./detail.css";

function PriceDetail() {
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
      <Container className="mb-20">
        <div className="price-1 mt-2">
          <h3>
            <b>IDR. 12.000.000 / Person</b>
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

export default PriceDetail;
