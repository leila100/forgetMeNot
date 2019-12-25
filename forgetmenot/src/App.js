import React from "react";
import { Route, Switch } from "react-router-dom";

import Information from "./components/information/Information";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NewMessage from "./components/message/NewMessage";

require("dotenv").config();

function App() {
  return (
    <div>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        {/* <Route path='/' component={Information} /> */}
        <Route exact path='/' component={NewMessage} />
      </Switch>
    </div>
  );
}

export default App;
