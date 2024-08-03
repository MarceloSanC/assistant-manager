import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home';
import Setup from './components/Setup';
import Manager from './components/Manager';
import './styles/App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
