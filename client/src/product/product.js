import { useQuery } from "react-query";

import { API } from "../config/api";

import { Container, Card, Image } from "react-bootstrap";
import "./product.css";
import img1 from "../src-assets/img1.jpg";
import { Link } from "react-router-dom";

function Product({ item }) {
  let api = API();

  const title = "Home";
  document.title = "Dewe Tour | " + title;

  // Fetching product data from database
  let { data: trip } = useQuery("tripsCache", async () => {
    const config = {
      method: "GET",
    };
    const response = await api.get("/trip", config);
    return response.data;
  });

  return (
    <>
      <Container className="d-flex flex-wrap justify-content-center">
        {trip?.map((item, index) => (
          <Link to={`/detail/` + item.id} className="link">
            <Card className="card-product">
              <Card.Body>
                <Image className="img-product mb-3" src={img1} />
                <h4 className="card-title">{item.title}</h4>
                <h5 className="price">
                  <b>IDR. {item.price}</b>
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

export default Product;
