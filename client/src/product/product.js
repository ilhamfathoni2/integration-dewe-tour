import { Container, Card, Image } from "react-bootstrap";
import "./product.css";
import img1 from "../src-assets/img1.jpg";

function Product() {
  return (
    <>
      <Container className="d-flex flex-wrap justify-content-center">
        <Card className="card-product">
          <Card.Body>
            <Image className="img-product mb-3" src={img1} />
            <h4 className="card-title">6D/4M Fun Tassie Vacation + Sydney</h4>
            <h5 className="price">
              <b>IDR. 12.000.000</b>
            </h5>
            <h5 className="country">Australia</h5>
          </Card.Body>
        </Card>
        <Card className="card-product">
          <Card.Body>
            <Image className="img-product mb-3" src={img1} />
            <h4 className="card-title">Amerika ALlllllll</h4>
            <h5 className="price">
              <b>IDR. 12.000.000</b>
            </h5>
            <h5 className="country">Amerika</h5>
          </Card.Body>
        </Card>
        <Card className="card-product">
          <Card.Body>
            <Image className="img-product mb-3" src={img1} />
            <h4 className="card-title">Amerika ALlllllll</h4>
            <h5 className="price">
              <b>IDR. 12.000.000</b>
            </h5>
            <h5 className="country">Amerika</h5>
          </Card.Body>
        </Card>
      </Container>
      <div className="mb-10"></div>
    </>
  );
}

export default Product;
