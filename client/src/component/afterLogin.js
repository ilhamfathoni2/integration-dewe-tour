// import { useContext } from "react";
// import { UserContext } from "../context/authContext";
import "./bassic.css";

import { Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import userLogin from "../src-assets/UserLogin.png";
import user2 from "../src-assets/user2.png";
import pay from "../src-assets/bill1.png";
import logoutIcon from "../src-assets/logout1.png";
import tripIcon from "../src-assets/journey1.png";

function AfterLogin() {
  //   const { state, dispatch } = useContext(UserContext);

  //   const handleLogout = (e) => {
  //     e.preventDefault();

  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="dropdown-after-login mt-1">
          <Image src={userLogin} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/profile">
              <Image className="icon-after-login" src={user2} alt="Profil" />
              <b className="b-user-log">Profile</b>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link to="/trip">
              <Image className="icon-after-login" src={tripIcon} alt="Pay" />
              <b className="b-user-log">Trip</b>
            </Link>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item>
            <Link to="/payment">
              <Image className="icon-after-login" src={pay} alt="Pay" />
              <b className="b-user-log">Pay</b>
            </Link>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item>
            <div>
              <Image
                className="icon-after-login"
                src={logoutIcon}
                alt="Logout"
              />
              <b className="b-user-log">Logout</b>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default AfterLogin;
