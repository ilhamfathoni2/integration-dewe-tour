import { Container } from "react-bootstrap";
import "./detail.css";

import iconHotel from "../src-assets/hotel.png";
import iconAirplan from "../src-assets/airplan.png";
import iconMeal from "../src-assets/meal.png";
import iconDuration from "../src-assets/duration.png";
import iconDate from "../src-assets/date.png";

function Description() {
  return (
    <>
      <Container>
        <h4 className="mt-5 mb-4">
          <b>Information Trip</b>
        </h4>
        <div className="info-trip mt-4">
          <div className="info-item">
            <h6>Accommodation</h6>
            <div className="item-2">
              <img className="icon-info" src={iconHotel} alt="img" />
              <h5 className="title-info">
                <b>Hotel 4 Nights</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Transportation</h6>
            <div className="item-2">
              <img className="icon-info" src={iconAirplan} alt="img" />
              <h5 className="title-info">
                <b>Qatar Airways</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Eat</h6>
            <div className="item-2">
              <img className="icon-info" src={iconMeal} alt="img" />
              <h5 className="title-info">
                <b>Included as ltinerary</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Duration</h6>
            <div className="item-2">
              <img className="icon-info" src={iconDuration} alt="img" />
              <h5 className="title-info">
                <b>6 Days 4 Night</b>
              </h5>
            </div>
          </div>
          <div className="info-item">
            <h6>Date Trip</h6>
            <div className="item-2">
              <img className="icon-info" src={iconDate} alt="img" />
              <h5 className="title-info">
                <b>26 Agustus 2020</b>
              </h5>
            </div>
          </div>
        </div>
        <h5 className="mt-5 mb-3">
          <b>Description</b>
        </h5>
        <p className="mb-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Container>
    </>
  );
}

export default Description;
