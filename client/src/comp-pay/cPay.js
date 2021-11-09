import { useState } from "react";
import { Container, Image, Form, Modal, Button } from "react-bootstrap";

import "./pay.css";
import Icon from "../src-assets/IconPay.png";
import inv from "../src-assets/btn-upload.jpg";

import convertRupiah from "rupiah-format";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory } from "react-router";

function ComPay({ item }) {
  let api = API();
  let history = useHistory();

  const [preview, setPreview] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    attachment: "",
  });

  const handleChange = (e) => {
    console.log(e.target.files);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (preview) {
        formData.set("attachment", preview[0]);
      }
      formData.set("status", "Waiting Approve");

      const config = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        body: formData,
      };

      await api.patch("/transaction/" + item.id, config);

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  let statusPay = "";
  if (item.status === "Waiting Payment") {
    statusPay = "badge-warning p-2 text-warning";
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
                <b>{item.trip.dateTrip}</b>
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
                <p>{item.trip.dateTrip}</p>
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
                <label htmlFor="files" className="pointerss">
                  {!preview ? (
                    <div>
                      <Image className="inv" src={inv} />
                    </div>
                  ) : (
                    <div>
                      <Image
                        className="inv"
                        src={URL.createObjectURL(preview[0])}
                      />
                    </div>
                  )}
                  <br />
                </label>
                <p className="text-center">Upload payment proof</p>
                <input
                  type="file"
                  id="files"
                  className="hidden"
                  name="attachment"
                  onChange={handleChange}
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
                    <b> {item.counterQty}</b>
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
        <div className="mt-4 d-flex justify-content-end">
          <Button className="wd" variant="warning" onClick={handleShow}>
            <b>Pay</b>
          </Button>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Confirm</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <input
              type="file"
              id="files"
              hidden
              name="attachment"
              onChange={handleChange}
            />
            <input
              type="text"
              className="hidden"
              name="status"
              value="Waiting Approve"
            />
            <h5 className="text-center">
              Your payment will be confirmed whithin 1 X 24 hours
            </h5>
            <h5 className="text-center">
              To see orders clik
              <Button className="here" type="submit">
                <b>Here</b>
              </Button>
              thank you
            </h5>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="mb-10"></div>
    </>
  );
}

export default ComPay;
