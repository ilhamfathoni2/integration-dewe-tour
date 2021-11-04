import { Image } from "react-bootstrap";
import "./profile.css";

import profilIcon from "../src-assets/icon-profil.png";
import emailIcon from "../src-assets/email.png";
import phoneIcon from "../src-assets/Phone.png";
import mapIcon from "../src-assets/map.png";
import Avatar from "../src-assets/Avatar.png";

function Personal() {
  return (
    <>
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
                    <b>Barak Obama</b> <br />
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
                    <b>obama@gmail.com</b> <br />
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
                    <b>082000232220</b>
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
                    <b>Jl. Ahmad Yani No.10 Surabaya</b> <br />
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
      <div className="mb-10"></div>
    </>
  );
}

export default Personal;
