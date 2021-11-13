import { Image } from "react-bootstrap";
import "./profile.css";

import profilIcon from "../src-assets/icon-profil.png";
import emailIcon from "../src-assets/email.png";
import phoneIcon from "../src-assets/Phone.png";
import mapIcon from "../src-assets/map.png";
import Avatar from "../src-assets/Avatar.png";

import { useQuery } from "react-query";

import { API } from "../config/api";

function Personal() {
  let api = API();

  const { data: profil } = useQuery("profilChace", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/user-data", config);

    return response.data;
  });

  return (
    <>
      {profil?.map((item, index) => (
        <div className="container d-flex justify-content-center">
          <div className="card col-sm-7 mt-5">
            <div className="card-body p-4">
              <h3 className="card-title text-p">Personal Info</h3>

              <div className="d-flex justify-content-end">
                <Image className="avatar" src={Avatar} />
              </div>

              <div className="row mt-2">
                <div className="col-sm-1 p-0">
                  <div className="card-body">
                    <Image src={profilIcon} />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="card-body">
                    <h6>
                      <b>{item.fullname}</b> <br />
                      <p>Full Name</p>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-1 p-0">
                  <div className="card-body">
                    <Image src={emailIcon} />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="card-body">
                    <h6>
                      <b>{item.email}</b> <br />
                      <p>Email</p>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-1 p-0">
                  <div className="card-body">
                    <Image src={phoneIcon} />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="card-body">
                    <h6>
                      <b>{item.phone}</b>
                      <br />
                      <p>Mobile Phone</p>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-1 p-0">
                  <div className="card-body">
                    <Image src={mapIcon} />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="card-body">
                    <h6>
                      <b>{item.address}</b> <br />
                      <p>Address</p>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end m-0 p-0">
                <button className="btn btn-warning col-5">
                  Change Photo Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mb-10"></div>
    </>
  );
}

export default Personal;
