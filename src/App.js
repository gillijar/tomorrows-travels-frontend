import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import Layout from "./components/UI/Layout";
import Home from "./components/Pages/Home/Home";
import Destinations from "./components/Pages/Destinations/DestinationsList";
import AllPlaces from "./components/Pages/All Places/AllPlaces";
import IndividualPlace from "./components/IndividualPlace";
import Login from "./components/Pages/Auth/Login";
import Signup from "./components/Pages/Auth/Signup";
import ForgotPassword from "./components/UI/ForgotPassword";
import CreateDestination from "./components/Pages/Create/CreateDestination";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/destinations">
          <Destinations />
        </Route>
        <Route path="/id/:id">
          <IndividualPlace />
        </Route>
        <Route path="/attractions" exact>
          <AllPlaces />
        </Route>
        <Route path="/restaurants" exact>
          <AllPlaces />
        </Route>
        <Route path="/attractions/:id">
          <IndividualPlace />
        </Route>
        <Route path="/restaurants/:id">
          <IndividualPlace />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/create-destination">
          <CreateDestination />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
