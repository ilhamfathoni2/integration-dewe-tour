import { Table, Container } from "react-bootstrap";
import "./dash.css";
import { useState } from "react";

import NavMain from "../component/navbar";
import Footer from "../component/footer";

import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

function Dashboard() {
  let api = API();

  const title = "Profit";
  document.title = "Dewe Tour | " + title;
  const [dataProfit, setProfit] = useState([]);

  const { data: profits } = useQuery("profits", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/profit", config);
    console.log(response);
    setProfit(response.totals);

    return response.datas;
  });

  return (
    <>
      <NavMain />
      <Container>
        <h5 className="card-title mb-3 mt-5">Profit</h5>
        <div className="card mb-5">
          <div className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Trip</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {profits?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.tripId}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-center">
                    <b>Profits</b>
                  </td>
                  <td colSpan="3" className="text-success">
                    <b>{"  " + convertRupiah.convert(dataProfit)}</b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="mt-10"></div>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
