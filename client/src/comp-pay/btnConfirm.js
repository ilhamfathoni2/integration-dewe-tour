import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Confirm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="wd btn btn-warning" onClick={handleShow}>
        <b>Pay</b>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Confirm</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">
            Your payment will be confirmed whithin 1 X 24 hours
          </h5>
          <h5 className="text-center">
            To see orders clik{" "}
            <Link to="/status-payment">
              <b>Here</b>
            </Link>{" "}
            thank you
          </h5>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Confirm;
