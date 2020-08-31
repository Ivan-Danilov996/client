import React from "react";
import "./App.css";
import AuthContainer from "./Components/Auth/AuthContainer";
import CartContainer from "./Components/Cart/CartContainer";
import { Route } from "react-router-dom";



const App = (props) => {
  return (
      <div>
        <Route path="/" render={() => <AuthContainer />} />
        <Route
          path="/cart"
          render={() => <CartContainer />}
        />
      </div>
  );
};

export default App;
