import { Button, Container } from "react-bootstrap";

function Btnaddtrip() {
  return (
    <Container>
      <div className="d-flex justify-content-end mt-5">
        <Button className="btn btn-warning">
          <b>Add Trip</b>
        </Button>
      </div>
    </Container>
  );
}

export default Btnaddtrip;
