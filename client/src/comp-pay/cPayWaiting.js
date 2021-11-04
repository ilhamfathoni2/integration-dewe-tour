import { Container, Image } from "react-bootstrap";
import "./pay.css";
import Icon from "../src-assets/IconPay.png";
import Invoice from "../src-assets/struck.png";
import WaitingApprove from "./waitingApprove";

function PayWaiting() {
  return (
    <>
      <Container>
        <div className="card mt-5">
          <div className="card-body p-5">
            <div className="d-flex justify-content-between p-0 m-0">
              <Image src={Icon} />
              <h4 className="card-title">Booking</h4>
            </div>
            <div className="d-flex justify-content-end p-0 m-0">
              <h6 className="card-text">
                <b>Saturday,</b> 22 July 2021
              </h6>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div className="card-body p-0 m-0">
                <h4>
                  <b>6D/4N Fun Tassie Vacation</b>
                </h4>
                <p>Australia</p>
                <WaitingApprove />
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Date Trip</b>
                </h6>
                <p>26 Agustus 2020</p>
                <h6>
                  <b>Accommodation</b>
                </h6>
                <p>Hotel 4 Nights</p>
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Duration</b>
                </h6>
                <p>6 Day 4 Night</p>
                <h6>
                  <b>Transportation</b>
                </h6>
                <p>Qatar Airways</p>
              </div>
              <div className="card-body d-flex align-items-end flex-column p-0 m-0">
                <label htmlFor="files" className="pointerss">
                  <Image className="inv" src={Invoice} />
                  <br />
                  Upload Transaction
                </label>
                <input type="file" id="files" className="hidden" />
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Barak Obama</td>
                  <td>Male</td>
                  <td>08221000112</td>
                  <td>
                    <b>Qty : 1</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end mb-0 mt-4">
              <h5>
                Total : <b className="text-danger">IDR 12.000.000</b>
              </h5>
            </div>
          </div>
        </div>
      </Container>
      <div className="mb-10"></div>
    </>
  );
}

export default PayWaiting;
