import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import searchIcon from "../src-assets/search1.png";
import PayModal from "./modalPay";
import Button from "@restart/ui/esm/Button";

function ModalTransaction() {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div onClick={() => setLgShow(true)}>
        <img src={searchIcon} alt="icon" />
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <PayModal />
          <Container>
            <div className="d-flex justify-content-end">
              <Button className="btn-dangers" onClick={() => setLgShow(false)}>
                Cancel
              </Button>
              <Button className="btn-successt">Aprove</Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTransaction;
