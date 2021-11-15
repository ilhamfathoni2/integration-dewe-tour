import { Container, Table } from "react-bootstrap";
import "./transaction.css";
import ModalTransaction from "./modal.js";

import { useQuery } from "react-query";
import { API } from "../config/api.js";

function DataTransaction() {
  let api = API();

  const { data: transaction } = useQuery("incomTrscChace", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    const response = await api.get("/incom-transaction", config);
    return response.data;
  });

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
                {transaction?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.user.fullname}</td>
                    <td>{item.country}</td>
                    <td>{item.attachment}</td>
                    {(() => {
                      if (item.status === "Waiting Payment") {
                        return (
                          <td className="text-warning">
                            <b>{item.status}</b>
                          </td>
                        );
                      } else if (item.status === "Waiting Approve") {
                        return (
                          <td className="text-secondary">
                            <b>{item.status}</b>
                          </td>
                        );
                      } else if (item.status === "Cancel") {
                        return (
                          <td className="text-danger">
                            <b>{item.status}</b>
                          </td>
                        );
                      } else {
                        return (
                          <td className="text-success">
                            <b>{item.status}</b>
                          </td>
                        );
                      }
                    })()}

                    <td className="text-center">
                      <ModalTransaction item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="mt-10"></div>
      </Container>
    </>
  );
}

export default DataTransaction;
