import React from "react";
import "./App.css";
import Header from "./Components/layout/Header";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Profile from "./Components/auth/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
