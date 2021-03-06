import { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from "./context/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./pages/home";
import Detail from "./pages/detail";
import Pay from "./pages/pay";
import Profile from "./pages/profile";
import IncomTransaction from "./pages/incomTransaction";
import IncomTrip from "./pages/incomTrip";
import Trip from "./pages/trip";
import Country from "./pages/country";

import { API } from "./config/api";
import Dashboard from "./dashboard/dash";

function PrivateRoute({ children, ...rest }) {
  const isRole = localStorage.getItem("role");

  let history = useHistory();

  return (
    <Route
      {...rest}
      render={() => {
        if (isRole === "admin") {
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

      if (response.message === "invalid token") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

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
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute>
          <Route exact path="/incom" component={IncomTransaction} />
          <Route exact path="/incom-trip" component={IncomTrip} />
          <Route exact path="/add-trip" component={Trip} />
          <Route exact path="/add-country" component={Country} />
          <Route exact path="/dashboard" component={Dashboard} />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
