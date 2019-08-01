import React from "react";
import { Route } from "react-router-dom";

import TopNavBar from "./components/navbar/TopNav";
import LeftBar from "./components/navbar/LeftBar";
import RightBar from "./components/navbar/RightBar";
import Calendar from "./components/calendar/Calendar";
import { Container } from "./styles/commonStyles";

function App() {
  return (
    <div>
      <TopNavBar />
      <Container>
        <LeftBar />
        <Route exact path='/' component={Calendar} />
        {/* <Route exact path="/messages" component={Messages} /> */}
        <RightBar />
      </Container>
    </div>
  );
}

export default App;
