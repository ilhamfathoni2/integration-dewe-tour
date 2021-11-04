import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./context/authContext";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
