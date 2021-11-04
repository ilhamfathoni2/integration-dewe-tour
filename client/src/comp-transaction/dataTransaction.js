import { Container, Table } from "react-bootstrap";
import "./transaction.css";
import ModalTransaction from "./modal";

function DataTransaction() {
  return (
    <>
      <Container>
        <h5 className="card-title mb-3 mt-5">Incoming Transaction</h5>
        <div className="card mb-5">
          <div className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Users</th>
                  <th>Trip</th>
                  <th>Bukti Transfer</th>
                  <th>Status Payment</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Barak Obama</td>
                  <td>Amerika</td>
                  <td>Bca.jpg</td>
                  <td className="text-warning">
                    <b>Pending</b>
                  </td>
                  <td className="text-center">
                    <ModalTransaction />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Barak Obama</td>
                  <td>Amerika</td>
                  <td>Bca.jpg</td>
                  <td className="text-success">
                    <b>Approve</b>
                  </td>
                  <td className="text-center">
                    <ModalTransaction />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Barak Obama</td>
                  <td>Amerika</td>
                  <td>Bca.jpg</td>
                  <td className="text-danger">
                    <b>Cancel</b>
                  </td>
                  <td className="text-center">
                    <ModalTransaction />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default DataTransaction;
