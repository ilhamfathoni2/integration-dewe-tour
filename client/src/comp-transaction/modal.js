import { useState } from "react";
import { Modal, Image } from "react-bootstrap";
import searchIcon from "../src-assets/search1.png";
import Button from "@restart/ui/esm/Button";

import Icon from "../src-assets/IconPay.png";
import convertRupiah from "rupiah-format";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory } from "react-router";
import moment from "moment";

function ModalTransaction({ item }) {
  const [lgShow, setLgShow] = useState(false);
  let api = API();
  let history = useHistory();

  let approve = "Approve";

  const handleApprove = useMutation(async () => {
    try {
      const data = {
        status: approve,
      };

      console.log(data);

      const body = JSON.stringify(data);

      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body,
      };

      await api.patch("/update-incom/" + item.id, config);

      history.go();
    } catch (error) {
      console.log(error);
    }
  });

  let cancel = "Cancel";
  const handleCancel = useMutation(async () => {
    try {
      const data = {
        status: cancel,
      };

      console.log(data);

      const body = JSON.stringify(data);

      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body,
      };

      await api.patch("/update-incom/" + item.id, config);

      history.go();
    } catch (error) {
      console.log(error);
    }
  });

  let statusPay;
  if (item.status === "Waiting Payment") {
    statusPay = "badge-warning p-2 text-warning";
  } else if (item.status === "Waiting Approve") {
    statusPay = "badge-info p-2 text-primary";
  } else if (item.status === "Cancel") {
    statusPay = "badge-danger p-2 text-danger";
  } else {
    statusPay = "badge-success p-2 text-success";
  }

  return (
    <>
      <div onClick={() => setLgShow(true)}>
        <img src={searchIcon} alt="icon" />
      </div>

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="card-body p-5">
            <div className="d-flex justify-content-between p-0 m-0">
              <Image src={Icon} />
              <h4 className="card-title">Booking</h4>
            </div>
            <div className="d-flex justify-content-end p-0 m-0">
              <h6 className="card-text">
                <b>{moment(item.trip.dateTrip).format("DD MMMM YYYY")}</b>
              </h6>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <div className="card-body p-0 m-0">
                <h4>
                  <b>{item.trip.title}</b>
                </h4>
                <p>{item.country}</p>
                <span className={statusPay}>{item.status}</span>
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Date Trip</b>
                </h6>
                <p>{moment(item.trip.dateTrip).format("DD MMMM YYYY")}</p>
                <h6>
                  <b>Accommodation</b>
                </h6>
                <p>{item.trip.accomodation}</p>
              </div>
              <div className="card-body d-flex flex-column p-0 m-0">
                <h6>
                  <b>Duration</b>
                </h6>
                <p>{item.trip.day}</p>
                <h6>
                  <b>Transportation</b>
                </h6>
                <p>{item.trip.transportation}</p>
              </div>
              <div className="card-body d-flex align-items-end flex-column p-0 m-0">
                <Image
                  className="inv"
                  src={"http://localhost:5000/uploads/" + item.attachment}
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
                  <td>{item.user.fullname}</td>
                  <td>{item.user.address}</td>
                  <td>{item.user.phone}</td>
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
          <div className="d-flex justify-content-end">
            <Button
              className="btn-dangers"
              onClick={() => handleCancel.mutate()}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleApprove.mutate()}
              className="btn-successt"
            >
              Aprove
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTransaction;
