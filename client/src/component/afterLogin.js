import { useContext } from "react";
import { UserContext } from "../context/authContext";
import "./bassic.css";

import { Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import userLogin from "../src-assets/UserLogin.png";
import user2 from "../src-assets/user2.png";
import pay from "../src-assets/bill1.png";
import logoutIcon from "../src-assets/logout1.png";
import tripIcon from "../src-assets/journey1.png";

function AfterLogin() {
  const [state, dispatch] = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch({
      type: "LOGOUT",
    });
  };

  if (state.user.role === "admin") {
    return (
      <>
        <Dropdown align="end">
          <Dropdown.Toggle className="dropdown-after-login mt-1">
            <Image src={userLogin} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile">
                <Image className="icon-after-login" src={user2} />
                <b className="b-user-log">Profile</b>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/incom-trip">
                <Image className="icon-after-login" src={tripIcon} />
                <b className="b-user-log">Trip</b>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/incom">
                <Image className="icon-after-login" src={pay} />
                <b className="b-user-log">Incoming Trip</b>
              </Link>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item>
              <div>
                <button className="btn-hide" onClick={handleLogout}>
                  <Image className="icon-after-login" src={logoutIcon} />
                  <b className="b-user-log">Logout</b>
                </button>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  } else {
    return (
      <>
        <Dropdown align="end">
          <Dropdown.Toggle className="dropdown-after-login mt-1">
            <Image src={userLogin} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile">
                <Image className="icon-after-login" src={user2} />
                <b className="b-user-log">Profile</b>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/payment">
                <Image className="icon-after-login" src={pay} />
                <b className="b-user-log">Pay</b>
              </Link>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item>
              <div>
                <button className="btn-hide" onClick={handleLogout}>
                  <Image className="icon-after-login" src={logoutIcon} />
                  <b className="b-user-log">Logout</b>
                </button>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default AfterLogin;
