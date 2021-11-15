import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./btntrip.css";

function BtnAdd() {
  return (
    <Container>
      <div className="d-flex justify-content-end mt-5">
        <Link to="/add-country">
          <Button variant="success" className="mrg-5">
            <b>Add Country</b>
          </Button>
        </Link>
        <Link to="/add-trip">
          <Button variant="warning">
            <b>Add Trip</b>
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default BtnAdd;
