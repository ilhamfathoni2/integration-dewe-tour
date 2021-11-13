import { useQuery } from "react-query";

import { API } from "../config/api";
import convertRupiah from "rupiah-format";

import { Container, Card, Image } from "react-bootstrap";
import "./product.css";
import { Link } from "react-router-dom";

function Product() {
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
      <Container className="d-flex flex-wrap justify-content-between">
        {trip?.map((item, index) => (
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

export default Product;
