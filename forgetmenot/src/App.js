import React from "react";

import MessageApp from "./components/message/MessageApp";
import { UserProvider } from "./components/user/userContext";

require("dotenv").config();

function App() {
  return (
    <UserProvider>
      <MessageApp />
    </UserProvider>
  );
}

export default App;
