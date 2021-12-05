import { Container, Image } from "react-bootstrap";
import "./profile.css";
import Icon from "../src-assets/IconPay.png";

import convertRupiah from "rupiah-format";
import moment from "moment";

function History({ item }) {
  let statusPay;
  if (item.status === "Waiting Payment") {
    statusPay = "badge-warning p-2 text-warning";
  } else if (item.status === "Waiting Approve") {
    statusPay = "badge-info p-2 text-primarys";
  } else if (item.status === "Cancel") {
    statusPay = "badge-danger p-2 text-danger";
  } else {
    statusPay = "badge-success p-2 text-success";
  }

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
                <b>{moment(item.dateTrip).format("DD MMMM YYYY")}</b>
              </h6>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div className="card-body p-0 m-0">
                <h4>
                  <b>{item.title}</b>
                </h4>
                <p>{item.country}</p>
                <span className={statusPay}>{item.status}</span>
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Date Trip</b>
                </h6>
                <p>{moment(item.dateTrip).format("DD MMMM YYYY")}</p>
                <h6>
                  <b>Accommodation</b>
                </h6>
                <p>{item.accomodation}</p>
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Duration</b>
                </h6>
                <p>{item.day}</p>
                <h6>
                  <b>Transportation</b>
                </h6>
                <p>{item.transportation}</p>
              </div>
              <div className="card-body d-flex align-items-end flex-column p-0 m-0">
                <Image
                  className="inv"
                  alt="Upload Bukti Pembayaran"
                  src={item.attachment}
                />
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.fullname}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>
                    <b className="mr4">Qty :</b>
                    <b>{item.counterQty}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end mb-0 mt-4">
              <h5>
                <b className="mr5">Total :</b>
                <b className="text-danger">
                  {"  " + convertRupiah.convert(item.total)}
                </b>
              </h5>
            </div>
          </div>
        </div>
      </Container>
      <div className="mb-10"></div>
    </>
  );
}

export default History;
