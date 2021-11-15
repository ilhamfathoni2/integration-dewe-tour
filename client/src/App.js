import { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from "./context/authContext.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./pages/home.js";
import Detail from "./pages/detail.js";
import Pay from "./pages/pay.js";
import AfterPay from "./pages/afterPay.js";
import Profile from "./pages/profile.js";
import IncomTransaction from "./pages/incomTransaction.js";
import IncomTrip from "./pages/incomTrip.js";
import Trip from "./pages/trip.js";
import Country from "./pages/country.js";

import { API } from "./config/api.js";

function PrivateRoute({ children, ...rest }) {
  let usersData = JSON.parse(localStorage.getItem("user"));
  let history = useHistory();

  return (
    <Route
      {...rest}
      render={() => {
        if (usersData.data.role === "admin") {
          return children;
        } else {
          return history.push("/");
        }
      }}
    />
  );
}

function App() {
  let api = API();
  const [, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // // Get user data
      let payload = response.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/payment" component={Pay} />
        <Route exact path="/status-payment" component={AfterPay} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute>
          <Route exact path="/incom" component={IncomTransaction} />
          <Route exact path="/incom-trip" component={IncomTrip} />
          <Route exact path="/add-trip" component={Trip} />
          <Route exact path="/add-country" component={Country} />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
