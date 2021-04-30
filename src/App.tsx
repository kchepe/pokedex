import React from "react";
import "./App.css";
import NavbarComponent from "./Components/NavbarComponent";
import TableComponent from "./Components/TableComponent";
import { GlobalProvider } from "./GlobalState/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div>
        <NavbarComponent />
        <TableComponent />
      </div>
    </GlobalProvider>
  );
}

export default App;
