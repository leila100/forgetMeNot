import React from "react";
import { Route, Switch } from "react-router-dom";

import TopNavBar from "./components/navbar/TopNav";
import Calendar from "./components/calendar/Calendar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

require("dotenv").config();

console.log(process.env);

function App() {
  return (
    <div>
      <TopNavBar />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Calendar} />
        {/* <Route exact path="/messages" component={Messages} /> */}
      </Switch>
    </div>
  );
}

export default App;
