import React from "react";
import "./App.css";
import { AuthHome, Container, Header } from "./components";
import { useAuth } from "./context/auth.context";

function App(): JSX.Element {
  const { currentUser } = useAuth();
  return (
    <div className="App p-2 bg-gray-50 h-screen">
      <Container>
        <Header />
        {currentUser === null ? (
          <AuthHome />
        ) : (
          <div>Hello, {currentUser.email}!</div>
        )}
      </Container>
    </div>
  );
}

export default App;
