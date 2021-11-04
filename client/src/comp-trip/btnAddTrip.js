import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Btnaddtrip() {
  return (
    <Container>
      <div className="d-flex justify-content-end mt-5">
        <Link to="/add-trip">
          <Button variant="warning">
            <b>Add Trip</b>
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Btnaddtrip;
