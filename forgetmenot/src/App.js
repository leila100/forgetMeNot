import React from "react";
import { Route, Switch } from "react-router-dom";

import TopNavBar from "./components/navbar/TopNav";
import Information from "./components/information/Information";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

require("dotenv").config();

function App() {
  return (
    <div>
      <TopNavBar />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Information} />
        {/* <Route path='/messages' component={Information} /> */}
      </Switch>
    </div>
  );
}

export default App;
