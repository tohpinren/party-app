import React from 'react';
import Party from './components/Party';
import PartyForm from './components/PartyForm';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.js';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Party />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-party" element = {<PartyForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;