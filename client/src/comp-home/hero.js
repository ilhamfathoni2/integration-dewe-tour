import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import "./hero.css";

function Hero() {
  return (
    <>
      <div className="bg-hero-main"></div>
      <Container>
        <h2 className="text-title">Explore</h2>
        <h2 className="text-title-second">your amazing city together</h2>
        <label className="label-form mb-3">Find great places to holliday</label>
        <InputGroup className="mb-3">
          <FormControl placeholder="Search" />
          <Button variant="warning">Search</Button>
        </InputGroup>
      </Container>
    </>
  );
}

export default Hero;
