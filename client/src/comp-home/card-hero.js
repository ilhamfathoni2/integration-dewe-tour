import { Container, Card, Image } from "react-bootstrap";
import "./hero.css";
import icon1 from "../src-assets/guarantee.png";
import icon2 from "../src-assets/like.png";
import icon3 from "../src-assets/agent.png";
import icon4 from "../src-assets/service.png";

function CardMain() {
  return (
    <>
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
      <h2 className="text-center mb-10">
        <b>Group Tour</b>
      </h2>
    </>
  );
}

export default CardMain;
