import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SwapPage from "./pages/SwapPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/swap" element={<SwapPage />} />
    </Routes>
  );
}

export default App;
