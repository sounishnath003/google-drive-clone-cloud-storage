import React from "react";
import "./App.css";
import { Header } from "./components";

function App(): JSX.Element {
  return (
    <div className="App p-2 bg-gray-50 h-screen">
      <Header />
    </div>
  );
}

export default App;
