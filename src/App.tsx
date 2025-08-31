import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage";
import DisplayPage from "./pages/DisplayPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
         <Route path="/display" element={<DisplayPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
