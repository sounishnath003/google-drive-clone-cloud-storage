import React from "react";
import "./App.css";
import { AuthHome, Container, Header } from "./components";

function App(): JSX.Element {
  return (
    <div className="App p-2 bg-gray-50 h-screen">
      <Container>
        <Header />
        <AuthHome />
      </Container>
    </div>
  );
}

export default App;
