import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./pages/home";
import Detail from "./pages/detail";
import Pay from "./pages/pay";
import AfterPay from "./pages/afterPay";
import Profile from "./pages/profile";
import IncomTransaction from "./pages/incomTransaction";
import IncomTrip from "./pages/incomTrip";
import Trip from "./pages/trip";

import { API } from "./config/api";

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
        <Route exact path="/incom" component={IncomTransaction} />
        <Route exact path="/incom-trip" component={IncomTrip} />
        <Route exact path="/add-trip" component={Trip} />
      </Switch>
    </>
  );
}

export default App;
