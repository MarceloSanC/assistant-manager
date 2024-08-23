import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";
import Setup from "./components/Setup";
import Manager from "./components/Manager";
import "./styles/App.css";
import { SessionProvider } from "./hooks/SessionContext";
import { ProfileProvider } from "./hooks/ProfileContext";

function App() {
  return (
    <ChakraProvider>
      <SessionProvider>
        <ProfileProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/manager" element={<Manager />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default App;
