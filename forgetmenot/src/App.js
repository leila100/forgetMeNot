import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NewMessage from "./components/message/NewMessage";
import Messages from "./components/message/Messages";

require("dotenv").config();

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={NewMessage} />
        <Route path='/messages' component={Messages} />
      </Switch>
    </div>
  );
}

export default App;
