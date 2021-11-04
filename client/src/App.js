import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import Detail from "./pages/detail";
import Pay from "./pages/pay";
import AfterPay from "./pages/afterPay";
import Profile from "./pages/profile";
import IncomTransaction from "./pages/incomTransaction";
import IncomTrip from "./pages/incomTrip";
import Trip from "./pages/trip";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/payment" component={Pay} />
          <Route exact path="/status-payment" component={AfterPay} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/incom" component={IncomTransaction} />
          <Route exact path="/incom-trip" component={IncomTrip} />
          <Route exact path="/add-trip" component={Trip} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
