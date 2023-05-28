import React from 'react';
import './App.css';
import {Layout, Rating} from "./components";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 text-gray-700 min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Rating />} />
          <Route path="*" element={<Rating />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
