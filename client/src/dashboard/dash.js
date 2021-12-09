import { Container, ProgressBar } from "react-bootstrap";
import "./dash.css";
import { useState } from "react";

import NavMain from "../component/navbar";
import Footer from "../component/footer";

import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

function Dashboard() {
  let api = API();

  const title = "Dashboard";
  document.title = "Dewe Tour | " + title;

  const [cancel, setCancel] = useState([]);
  const [waiting, setwaiting] = useState([]);

  const [totalApprove, settotalApprove] = useState([]);
  const [totalCancel, settotalCancel] = useState([]);
  const [totalWaiting, settotalWaiting] = useState([]);

  const { data: saldo } = useQuery("saldo", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/saldo", config);
    setCancel(response.cancel);
    setwaiting(response.waiting);
    settotalApprove(response.totalApprove.count);
    settotalCancel(response.totalCancel.count);
    settotalWaiting(response.totalWaiting.count);
    return response.incom;
  });

  const [admin, setAdmin] = useState([]);

  const { data: users } = useQuery("users", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/user-data", config);
    setAdmin(response.admin.count);
    return response.datas.count;
  });

  return (
    <>
      <NavMain />
      <Container>
        <h5 className="card-title mb-4 mt-5">Dashboard</h5>
        <h5 className="text-secondary mb-3 mt-5">
          <b>Saldo</b>
        </h5>
        <div className="d-flex justify-content-between">
          <div className="shadow p-4 bg-body rounded card-saldo">
            <b className="mb-4 mt-3 text-secondary">Income </b>
            <h5 className="mb-0 mt-2">
              <b className="text-success mb-0">
                {convertRupiah.convert(saldo)}
              </b>
            </h5>
          </div>
          <div className="shadow p-4 bg-body rounded card-saldo">
            <b className="mb-4 mt-3 text-secondary">Waiting Approve</b>
            <h5 className="mb-0 mt-2">
              <b className="text-warning mb-0">
                {convertRupiah.convert(waiting)}
              </b>
            </h5>
          </div>
          <div className="shadow p-4 bg-body rounded card-saldo">
            <b className="mb-4 mt-3 text-secondary">Cancel</b>
            <h5 className="mb-0 mt-2">
              <b className="text-danger mb-0">
                {convertRupiah.convert(cancel)}
              </b>
            </h5>
          </div>
        </div>
        <div className="shadow p-4 bg-body rounded mt-5 mb-4">
          <label className="text-secondary">Income</label>
          <ProgressBar
            className="mb-3"
            variant="success"
            now={totalApprove}
            label={`${totalApprove} pcs`}
          />
          <label className="text-secondary">Waiting Approve</label>
          <ProgressBar
            className="mb-3"
            variant="warning"
            now={totalWaiting}
            label={`${totalWaiting}`}
          />
          <label className="text-secondary">Cancel</label>
          <ProgressBar
            className="mb-3"
            variant="danger"
            now={totalCancel}
            label={`${totalCancel}`}
          />
        </div>
        <h5 className="text-secondary mb-3 mt-5">
          <b>Total User</b>
        </h5>
        <div className="d-flex">
          <div className="shadow p-4 bg-body rounded card-custom mrg-5">
            <b className="mb-4 mt-3 text-secondary">Customer</b>
            <h5 className="mb-0 mt-2">
              <b className="text-success mb-0">{users}</b>
            </h5>
          </div>
          <div className="shadow p-4 bg-body rounded card-custom">
            <b className="mb-4 mt-3 text-secondary">Admin</b>
            <h5 className="mb-0 mt-2">
              <b className="text-danger mb-0">{admin}</b>
            </h5>
          </div>
        </div>
        <div className="mt-10"></div>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
