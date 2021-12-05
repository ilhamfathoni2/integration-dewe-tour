import { createContext, useReducer } from "react";

export const UserContext = createContext();

const dataUser = {
  isLogin: false,
  user: {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  },
};

const userOf = JSON.stringify(dataUser);

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.setItem("token", userOf);
      return {
        isLogin: false,
        user: { fullname: "", email: "", phone: "", address: "", role: "" },
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
