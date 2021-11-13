import {
  Container,
  Image,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import "./hero.css";

import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

import "../product/product.css";
import { Link } from "react-router-dom";

import icon1 from "../src-assets/guarantee.png";
import icon2 from "../src-assets/like.png";
import icon3 from "../src-assets/agent.png";
import icon4 from "../src-assets/service.png";

function Hero() {
  let api = API();

  const title = "Home";
  document.title = "Dewe Tour | " + title;

  const [searchTitle, setsearchTitle] = useState("");

  let { data: trip } = useQuery("tripsCache", async () => {
    const config = {
      method: "GET",
    };
    const response = await api.get("/trip", config);
    return response.data;
  });

  return (
    <>
      <div className="bg-hero-main"></div>
      <Container>
        <h2 className="text-title">Explore</h2>
        <h2 className="text-title-second">your amazing city together</h2>
        <label className="label-form mb-3">Find great places to holliday</label>
        <InputGroup className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setsearchTitle(event.target.value);
            }}
          />
          <Button variant="warning">Search</Button>
        </InputGroup>
      </Container>
      <div className="mt-00">
        <Container className="d-flex justify-content-between">
          <Card className="card-strend">
            <Card.Body>
              <Image className="icon-hero mb-3" src={icon1} />
              <h4 className="mb-3">Best Price Guarantee</h4>
              <p>A small river named Duren flows by their place and supplies</p>
            </Card.Body>
          </Card>
          <Card className="card-strend">
            <Card.Body>
              <Image className="icon-hero mb-3" src={icon2} />
              <h4 className="mb-3">Travellers Love Us</h4>
              <p>A small river named Duren flows by their place and supplies</p>
            </Card.Body>
          </Card>
          <Card className="card-strend">
            <Card.Body>
              <Image className="icon-hero mb-3" src={icon3} />
              <h4 className="mb-3">Best Travel Agent</h4>
              <p>A small river named Duren flows by their place and supplies</p>
            </Card.Body>
          </Card>
          <Card className="card-strend">
            <Card.Body>
              <Image className="icon-hero mb-3" src={icon4} />
              <h4 className="mb-3">Our Dedicated Support</h4>
              <p>A small river named Duren flows by their place and supplies</p>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <h2 className="text-center mb-8">
        <b>Group Tour</b>
      </h2>
      <Container className="d-flex flex-wrap justify-content-between">
        {trip
          ?.filter((item) => {
            if (searchTitle === "") {
              return item;
            } else if (
              item.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item, index) => (
            <Link to={`/detail/` + item.id} className="link">
              <Card className="card-product">
                <Card.Body>
                  <div className="quota">
                    <b>
                      {item.quotaMinus} / {item.quota}
                    </b>
                  </div>
                  <Image className="img-product mb-3" src={item.image[1].url} />
                  <h4 className="card-title">{item.title}</h4>
                  <h5 className="price">
                    <b>{convertRupiah.convert(item.price)}</b>
                  </h5>
                  <h5 className="country">{item.country.name}</h5>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </Container>
      <div className="mb-10"></div>
    </>
  );
}

export default Hero;
