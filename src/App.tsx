import React from "react";
import "./App.css";
import { AuthHome, Container, Dashboard, Header } from "./components";
import { useAuth } from "./context/auth.context";

function App(): JSX.Element {
  const { currentUser } = useAuth();

  React.useEffect(() => {
    console.log("App re-initialized!");
  }, [currentUser]);

  return (
    <div className="App p-2 bg-gray-50 h-screen">
      <Container>
        <Header />
        {currentUser === null ? <AuthHome /> : <Dashboard />}
      </Container>
    </div>
  );
}

export default App;
