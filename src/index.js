import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./routes/Navbar";
import Home from "./routes/Home";
import Converter from "./routes/Converter"; 
import NoPage from "./routes/NoPage"; 
import "./index.css";

export default function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/character-converter" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/character-converter/converter" element={<Converter />} />
          <Route path="/character-converter/*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
